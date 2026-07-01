/**
 * Engine Simulation Script
 * 
 * Runs the investment game engine headlessly for N iterations of M turns each,
 * collecting statistics on bankruptcy rates, average returns, trait impact,
 * and outcome distributions. Used to validate that the math model produces
 * a fun, balanced experience before layering on content.
 * 
 * Usage: node src/engine/simulate.js
 */

import { generatePitchesForTurn, getNewsForTurn, resolveTurn, rollPitchInstance } from "./turnResolution.js";
import { rollHoldingOutcome } from "./outcomeRoll.js";
import { TRAITS } from "../data/traits.js";
import { PITCH_TEMPLATES } from "../data/pitches.js";

const ITERATIONS = 1000;
const MAX_TURNS = 52;
const INITIAL_CASH = 10_000_000;
const OPERATING_COST = 50_000;
const INDUSTRY = "Health & Wellness";

// ── Helpers ──────────────────────────────────────────────────────────────

function createFreshState() {
  return {
    saveVersion: 1,
    turn: 1,
    cash: INITIAL_CASH,
    netWorthHistory: [INITIAL_CASH],
    points: { available: 10, max: 10 },
    industry: INDUSTRY,
    portfolio: [],
    eventQueue: [],
    diligenceLog: {},
    currentPitches: generatePitchesForTurn(INDUSTRY, 3),
    currentNews: getNewsForTurn(1, INDUSTRY),
    gameOver: false,
    demoFinished: false,
  };
}

/**
 * A simple AI player that invests in every pitch it can afford.
 * This represents maximum-aggression to stress-test the bankruptcy floor.
 */
function aggressivePlayer(state) {
  let { cash, currentPitches, portfolio, netWorthHistory } = state;
  const invested = [];

  for (const pitch of currentPitches) {
    if (cash >= pitch.ask) {
      const equityPercent = Number(((pitch.ask / pitch.valuation) * 100).toFixed(2));
      const holding = {
        pitchId: pitch.id,
        businessName: pitch.businessName,
        archetype: pitch.archetype,
        investedAmount: pitch.ask,
        equityPercent,
        currentValueMultiplier: 1.0,
        turnsHeld: 0,
        status: "active",
        eventChance: { base: 0.1, trendModifier: 0 },
        traits: pitch.traits,
        outcomeWeights: pitch.outcomeWeights,
        history: [],
        pitchSummary: pitch.pitchSummary,
        valuationAtInvestment: pitch.valuation,
      };
      cash -= pitch.ask;
      portfolio = [...portfolio, holding];
      invested.push(pitch.businessName);
    }
  }

  // Recalculate net worth after investing
  const activeValue = portfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
  const nw = cash + activeValue;

  return {
    ...state,
    cash,
    portfolio,
    currentPitches: [], // all reviewed
    netWorthHistory: [...netWorthHistory.slice(0, -1), nw],
  };
}

/**
 * A cautious AI player that only invests if ≤50% of cash is deployed
 * and skips pitches randomly ~40% of the time.
 */
function cautiousPlayer(state) {
  let { cash, currentPitches, portfolio, netWorthHistory } = state;

  const deployedValue = portfolio
    .filter(h => h.status === "active")
    .reduce((sum, h) => sum + h.investedAmount, 0);

  for (const pitch of currentPitches) {
    // Only invest if total deployed < 50% of net worth
    const totalAssets = cash + deployedValue;
    if (deployedValue / totalAssets > 0.5) break;
    // Skip ~40% of pitches
    if (Math.random() < 0.4) continue;

    if (cash >= pitch.ask) {
      const equityPercent = Number(((pitch.ask / pitch.valuation) * 100).toFixed(2));
      const holding = {
        pitchId: pitch.id,
        businessName: pitch.businessName,
        archetype: pitch.archetype,
        investedAmount: pitch.ask,
        equityPercent,
        currentValueMultiplier: 1.0,
        turnsHeld: 0,
        status: "active",
        eventChance: { base: 0.1, trendModifier: 0 },
        traits: pitch.traits,
        outcomeWeights: pitch.outcomeWeights,
        history: [],
        pitchSummary: pitch.pitchSummary,
        valuationAtInvestment: pitch.valuation,
      };
      cash -= pitch.ask;
      portfolio = [...portfolio, holding];
    }
  }

  const activeValue = portfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
  const nw = cash + activeValue;

  return {
    ...state,
    cash,
    portfolio,
    currentPitches: [],
    netWorthHistory: [...netWorthHistory.slice(0, -1), nw],
  };
}

// ── Simulation runner ────────────────────────────────────────────────────

function runSimulation(playerFn, label) {
  const results = {
    bankruptcies: 0,
    completions: 0,
    finalNetWorths: [],
    peakNetWorths: [],
    totalInvestmentsMade: [],
    totalFailures: [],
    traitFrequency: {},
    outcomeTypeCounts: { growth: 0, decline: 0, volatile: 0 },
    totalOutcomeRolls: 0,
  };

  for (let i = 0; i < ITERATIONS; i++) {
    let state = createFreshState();
    let investmentCount = 0;
    let failureCount = 0;

    for (let t = 0; t < MAX_TURNS; t++) {
      if (state.gameOver) break;

      // Player makes decisions
      const beforePortfolio = state.portfolio.length;
      state = playerFn(state);
      investmentCount += state.portfolio.length - beforePortfolio;

      // Track trait frequency for all holdings
      for (const h of state.portfolio) {
        for (const traitId of h.traits) {
          results.traitFrequency[traitId] = (results.traitFrequency[traitId] || 0) + 1;
        }
      }

      // Resolve turn (portfolio outcomes, operating cost, etc.)
      // We need to capture outcome types from the resolution
      const activeHoldings = state.portfolio.filter(h => h.status === "active");
      for (const holding of activeHoldings) {
        const { outcomeType } = rollHoldingOutcome(holding);
        results.outcomeTypeCounts[outcomeType]++;
        results.totalOutcomeRolls++;
      }

      const resolved = resolveTurn(state, OPERATING_COST);
      state = { ...state, ...resolved };

      // Count failures this turn
      const newFailures = state.portfolio.filter(h => h.status === "failed").length;
      failureCount = newFailures;
    }

    if (state.gameOver) {
      results.bankruptcies++;
    } else {
      results.completions++;
    }

    const activeValue = state.portfolio
      .filter(h => h.status === "active" || h.status === "exit_pending")
      .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
    const finalNW = state.cash + activeValue;

    results.finalNetWorths.push(finalNW);
    results.peakNetWorths.push(Math.max(...state.netWorthHistory));
    results.totalInvestmentsMade.push(investmentCount);
    results.totalFailures.push(failureCount);
  }

  // ── Compute aggregates ──
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const median = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  const pct = (arr, p) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = Math.floor(p * sorted.length);
    return sorted[Math.min(idx, sorted.length - 1)];
  };

  console.log(`\n${"═".repeat(60)}`);
  console.log(`  ${label}  (${ITERATIONS} iterations × ${MAX_TURNS} turns)`);
  console.log(`${"═".repeat(60)}`);

  console.log(`\n  SURVIVAL`);
  console.log(`    Bankruptcies:     ${results.bankruptcies} / ${ITERATIONS}  (${((results.bankruptcies / ITERATIONS) * 100).toFixed(1)}%)`);
  console.log(`    Completions:      ${results.completions} / ${ITERATIONS}  (${((results.completions / ITERATIONS) * 100).toFixed(1)}%)`);

  console.log(`\n  NET WORTH (final)`);
  console.log(`    Mean:             $${Math.round(avg(results.finalNetWorths)).toLocaleString()}`);
  console.log(`    Median:           $${Math.round(median(results.finalNetWorths)).toLocaleString()}`);
  console.log(`    10th percentile:  $${Math.round(pct(results.finalNetWorths, 0.1)).toLocaleString()}`);
  console.log(`    90th percentile:  $${Math.round(pct(results.finalNetWorths, 0.9)).toLocaleString()}`);
  console.log(`    Best run:         $${Math.round(Math.max(...results.finalNetWorths)).toLocaleString()}`);
  console.log(`    Worst run:        $${Math.round(Math.min(...results.finalNetWorths)).toLocaleString()}`);

  console.log(`\n  PEAK NET WORTH`);
  console.log(`    Mean peak:        $${Math.round(avg(results.peakNetWorths)).toLocaleString()}`);
  console.log(`    Median peak:      $${Math.round(median(results.peakNetWorths)).toLocaleString()}`);

  console.log(`\n  INVESTMENTS`);
  console.log(`    Avg per run:      ${avg(results.totalInvestmentsMade).toFixed(1)}`);
  console.log(`    Avg failures:     ${avg(results.totalFailures).toFixed(2)}`);

  const returnPct = results.finalNetWorths.map(nw => ((nw - INITIAL_CASH) / INITIAL_CASH) * 100);
  const positive = returnPct.filter(r => r > 0).length;
  const negative = returnPct.filter(r => r < 0).length;
  console.log(`\n  RETURNS`);
  console.log(`    Mean return:      ${avg(returnPct).toFixed(1)}%`);
  console.log(`    Median return:    ${median(returnPct).toFixed(1)}%`);
  console.log(`    Profitable runs:  ${positive} / ${ITERATIONS}  (${((positive / ITERATIONS) * 100).toFixed(1)}%)`);
  console.log(`    Loss runs:        ${negative} / ${ITERATIONS}  (${((negative / ITERATIONS) * 100).toFixed(1)}%)`);

  console.log(`\n  OUTCOME DISTRIBUTION (across ${results.totalOutcomeRolls.toLocaleString()} rolls)`);
  for (const type of ["growth", "decline", "volatile"]) {
    const count = results.outcomeTypeCounts[type];
    const pctOfTotal = ((count / results.totalOutcomeRolls) * 100).toFixed(1);
    console.log(`    ${type.padEnd(12)} ${count.toLocaleString().padStart(8)}  (${pctOfTotal}%)`);
  }

  console.log(`\n  TRAIT FREQUENCY (how often each trait appeared across all holdings)`);
  const sortedTraits = Object.entries(results.traitFrequency).sort((a, b) => b[1] - a[1]);
  for (const [traitId, count] of sortedTraits) {
    const def = TRAITS[traitId];
    const label = def ? `${def.label} [${def.severity}]` : traitId;
    console.log(`    ${label.padEnd(40)} ${count.toLocaleString()}`);
  }

  console.log(`\n${"─".repeat(60)}\n`);

  return results;
}

// ── Run both strategies ──────────────────────────────────────────────────

console.log("\n🎲 INVESTMENT GAME ENGINE SIMULATION");
console.log(`   Starting ${ITERATIONS.toLocaleString()} iterations per strategy...\n`);

const t0 = performance.now();
const aggressiveResults = runSimulation(aggressivePlayer, "AGGRESSIVE STRATEGY (invest in everything)");
const cautiousResults = runSimulation(cautiousPlayer, "CAUTIOUS STRATEGY (50% cap, 40% skip rate)");
const elapsed = ((performance.now() - t0) / 1000).toFixed(2);

console.log(`\n✅ Simulation complete in ${elapsed}s`);

// ── Summary comparison ───────────────────────────────────────────────────
const avgAgg = aggressiveResults.finalNetWorths.reduce((a, b) => a + b, 0) / ITERATIONS;
const avgCau = cautiousResults.finalNetWorths.reduce((a, b) => a + b, 0) / ITERATIONS;

console.log(`\n${"═".repeat(60)}`);
console.log("  HEAD-TO-HEAD COMPARISON");
console.log(`${"═".repeat(60)}`);
console.log(`                         Aggressive       Cautious`);
console.log(`  Bankruptcy rate:       ${((aggressiveResults.bankruptcies / ITERATIONS) * 100).toFixed(1).padStart(6)}%          ${((cautiousResults.bankruptcies / ITERATIONS) * 100).toFixed(1).padStart(6)}%`);
console.log(`  Avg final NW:    $${Math.round(avgAgg).toLocaleString().padStart(14)}   $${Math.round(avgCau).toLocaleString().padStart(14)}`);
console.log(`${"═".repeat(60)}\n`);
