# Investor Game — Project Overview

## Concept

A 2D, UI-based investing game inspired by private equity / venture investing.
The player starts with a fortune and grows it by evaluating pitches from
business founders — deciding whether to invest, how much diligence to do,
and managing a portfolio over time. The long-term vision is a full game with
multiple industries, negotiation, progression tiers (amateur investor →
global capitalist), upgrades, and a living market shaped by news and world
events. This document covers the **demo scope** in full, plus what's
deliberately deferred and how it's meant to slot in later.

Eventual stretch goal: this could double as a lightweight learning tool for
basic investing concepts, though that's not a design constraint right now.

---

## Design Philosophy

The core hook is **diligence as reasoning, not as a resource sink**. Early
designs considered a simple "pay points, get guaranteed info" model, but the
better version makes the player synthesize *world news* + *partial diligence
clues* + *their own judgment* to decide whether a pitch is trustworthy. Nudges
toward this from our design discussion, worth preserving in any future work:

- Background check and deep dive must **both stay worth using all game** —
  severity of what's hidden is intentionally **uncorrelated** with which tool
  uncovers it. A severe issue might surface cheaply on a background check;
  a deep dive might turn up nothing but a neutral quirk. Neither tool should
  become "the one that always finds the real stuff."
- Not all information is actionable. Some news is flavor/noise. Some founder
  traits are explicitly **neutral** (e.g. "shops the deal to multiple
  investors") — they sound notable but carry no outcome penalty. This teaches
  players that diligence is about judgment, not pattern-matching a flag.
- Outcomes are **probabilistic, not deterministic**, and tied to the
  underlying truth of a pitch (its traits) regardless of whether the player
  ever discovers that truth. Diligence shifts odds in the player's favor by
  informing their *decision*, it doesn't change the world's dice roll. A
  well-vetted investment can still go bad; a red-flagged one can still pay
  off. This is what makes the game feel honest rather than like a lookup
  puzzle with a "correct" answer.
- Portfolio companies are alive over time — performance rolls every turn
  while held, not once at investment time. This is also what makes "checking
  in on old investments" feel like real content instead of a static ledger.
- Pitches are **templates, not fixed instances** — the same business can
  roll different traits, different outcome weights, and different ask/
  valuation each time it's drawn. This keeps diligence honest: a player
  (or a friend playtesting repeatedly) can't memorize "this business is
  always the risky one" and skip genuine reasoning.

---

## Demo Scope — What's In

- **Single industry**: Health & Wellness (chosen for rich, legible founder
  personality/history traits — fits the "uncalculated risk taker" /
  "questionable legal history" / "neutral quirk" trait design well).
- **2-3 pitches per turn**, drawn from a pitch bank, lightly randomized
  (ask/valuation jitter) so repeats don't feel identical across plays.
- **News system**: general + industry-specific headlines shown at the start
  of relevant turns. Some are genuine diligence clues (tied to specific
  traits via `relevantTraits`), some are ambient noise. This is the
  primary new mechanic this demo exists to test.
- **Diligence**:
  - Background check (1 point) — shows hints for every trait on the pitch
    that's flagged as background-discoverable. Cheap, broad, partial.
  - Deep dive (2 points) — attempts to fully reveal **one** trait at random
    from those discoverable via deep dive. Has a real miss chance (~25%),
    so it's a genuine risk, not strictly-better-if-affordable.
- **Investment decision**: simple yes/no. No negotiation/haggling in the
  demo (full game adds counter-offers, founder happiness meter, deal
  structure choices).
- **Portfolio**:
  - Each holding rolls performance every turn it's held (growth / decline /
    volatile outcome type, each with its own multiplier range).
  - Player can exit a position at any time; exit takes effect **next turn**
    (the position can still move, up or down, during the pending turn —
    deliberate realism, not a bug).
- **Operating cost** deducted from cash every turn, to create real pressure
  to deploy capital rather than sit on cash indefinitely.
- **Net worth tracking** turn over turn (used for a graph in the eventual
  full UI; currently just logged as a history array).
- **Loss state**: game ends if net worth (cash + portfolio value) hits zero.
- **Save/load**: full game state serializes to `localStorage` automatically
  on every state change. `saveVersion` field exists from day one so future
  schema changes can detect and handle stale saves rather than crashing.

## Demo Scope — What's Explicitly Out (but architecturally seamed in)

- **Portfolio events** (follow-on funding requests, buyout offers, distress
  requests). Deliberately deferred *after* the core loop is proven, per
  explicit discussion — but the seams are already in place:
  - `eventChance: { base, trendModifier }` exists on every portfolio
    holding already, unused for now.
  - `eventQueue: []` exists in game state and is checked (as a no-op) at
    the start of `resolveTurn`.
  - When built, an event should be a generic object (see Data Schema below)
    so follow-on/buyout/distress can all share one shape.
  - Per our discussion: events should interrupt the turn as a blocking
    pop-up, resolved one at a time if multiple queue up, **before** the
    player reaches the news/pitch dashboard.
  - Declining a follow-on request should **dilute equity** (reduce
    `equityPercent` by a small rolled amount), not be a free no-cost pass —
    this gives the decision real teeth.
- **Negotiation/haggling**: counter-offers, founder happiness meter, deal
  structure (equity vs. debt vs. convertible). Full-game feature.
- **Progression tiers**: amateur investor → global capitalist leveling.
- **Upgrades**: more turn points, negotiation skill, unlocking new
  industries. `points.max` and `industry` are both already isolated fields
  in state specifically so upgrades can modify them later without
  restructuring state.
- **Multiple industries / unlocking**: demo hardcodes one industry
  (`DEMO_INDUSTRY` constant in `state/gameState.js`). Full game scopes to 5
  industries unlocked through play.
- **Rival investors, market-wide cycles, crisis events beyond
  diligence-discoverable traits**: full-game systems, not designed in
  schema detail yet.

---

## Tech Stack & Architecture

- **React + Vite**, plain JS (no TypeScript yet — worth considering for the
  full game given the data schema complexity, not required for the demo).
- **State management**: `useState` in `App.jsx` for now. Flagged in design
  discussion that **Zustand** is the natural upgrade if/when state logic
  outgrows prop-drilling (likely once negotiation and portfolio events both
  need to read/write overlapping state).
- **Persistence**: `localStorage`, see `state/gameState.js`
  (`saveGame`/`loadGame`/`clearSave`). This is NOT the same constraint as
  Claude.ai artifacts (which can't use browser storage) — this is a real
  standalone app, so localStorage is fully supported.
- **No backend** for the demo. Saves are local to each player's browser —
  fine for "share with a few friends to test," but means no cross-device
  sync. Worth knowing if testers expect to pick up on a different device.
- **Deployment target**: Cloudflare Pages (same as other projects in this
  ecosystem) — push to a git repo, connect it, done.
- **Why not a game engine (Unity/Godot)**: this is fundamentally a UI state
  machine (cards, dashboards, pop-ups, text), not a real-time rendering
  problem. React's component model maps naturally onto the game's screens.
  Revisit only if the full game ever needs real animation/physics, which
  isn't currently planned.

### File Structure

```
src/
  data/        Pure content — traits.js, news.js, pitches.js. No logic.
  engine/      Pure logic — diligence.js, outcomeRoll.js, turnResolution.js.
               No React, fully testable independent of UI.
  state/       gameState.js — initial state shape, save/load.
  components/  Dumb UI components — render what they're given, minimal
               internal logic. NewsPanel, PitchCard, Portfolio.
  App.jsx      Orchestrator — wires state + engine + components together.
```

This separation is the single most important architectural decision for
scaling cleanly: **adding new systems (negotiation, portfolio events,
upgrades, new industries) should mean adding new fields to existing data
objects and new engine functions that read them — not rewriting UI or
restructuring state.**

---

## Data Schema (Current, Demo Version)

### Trait (`data/traits.js`)

The unit of hidden/discoverable information about a founder or business.
Severity and discoverability are independent axes — set deliberately per
trait, not derived from each other.

```js
{
  id: string,
  label: string,
  severity: "neutral" | "mild" | "moderate" | "severe",
  category: "personality" | "history" | "process" | "financial" | "legal",
  discoverable: { backgroundCheck: bool, deepDive: bool },
  backgroundCheckHint: string,
  deepDiveReveal: string,
  outcomeNudge: { growth: number, decline: number, volatile: number }
}
```

### News (`data/news.js`)

```js
{
  id: string,
  turn: number,
  scope: "general" | "industry",
  industry: string | null,       // null when scope is "general"
  headline: string,
  detail: string,
  relevantTraits: string[]       // ties this news item to trait(s) it hints at;
                                  // empty array = intentional noise/flavor
}
```

### Pitch (`data/pitches.js`)

Pitch bank entries are **templates**, not fixed instances. `traits` and
`outcomeWeights` are intentionally NOT stored directly on the template —
they're rolled fresh every time the pitch is drawn for a turn's dashboard
(see `rollPitchInstance` in `engine/turnResolution.js`). This is what
prevents a given business from always having the same hidden truth across
or within playthroughs, which matters a lot for replayability and for
keeping diligence a genuine read of *this instance* rather than memorized
trivia.

```js
// Template (data/pitches.js)
{
  id: string,
  businessName: string,
  industry: string,
  archetype: string,              // flavors tone/text; loosely biases
                                   // (does not fully determine) which
                                   // traits get rolled
  baseAsk: number,
  baseValuation: number,
  pitchSummary: string,
  possibleTraitPool: string[],    // candidate trait ids this business
                                   // COULD roll — not all get selected
  traitCountRange: [min, max],    // how many traits roll in, inclusive
  baseOutcomeWeights: {
    growth: number, decline: number, volatile: number
  },
  outcomeWeightVariance: number   // +/- jitter applied per instance,
                                   // before trait nudges are summed in
}

// Rolled instance (what actually appears on the dashboard / gets invested in)
{
  id: string,                      // matches template id
  businessName: string,
  industry: string,
  archetype: string,
  pitchSummary: string,
  ask: number,                     // jittered from baseAsk
  valuation: number,                // jittered from baseValuation
  traits: string[],                 // rolled subset of possibleTraitPool
  outcomeWeights: {...}             // jittered from baseOutcomeWeights
}
```

**Important implication for portfolio holdings**: since `pitchBank` only
stores templates, a holding's `traits` and `outcomeWeights` are captured
and stored directly **on the holding itself** at investment time (see
`handleInvest` in `App.jsx`) — performance rolls read from the holding's
own stored values, never re-look-up the pitch bank. The holding is the
permanent record of which specific rolled instance was actually bought.

### Portfolio Holding (lives in game state, not a data bank)

```js
{
  pitchId: string,
  investedAmount: number,
  equityPercent: number,
  currentValueMultiplier: number,  // compounds each turn via outcome rolls
  turnsHeld: number,
  status: "active" | "exit_pending" | "exited" | "failed",
  eventChance: { base: number, trendModifier: number },  // unused in demo,
                                                           // reserved for
                                                           // portfolio events
  traits: string[],                 // captured from the rolled pitch
                                     // instance at investment time —
                                     // permanent ground truth for THIS
                                     // holding specifically
  outcomeWeights: {...}              // same — captured, not re-derived
}
```

### Portfolio Event (designed, not yet implemented)

Generic shape meant to cover follow-on requests, buyout offers, and
distress requests with one structure:

```js
{
  id: string,
  type: "follow_on_request" | "buyout_offer" | "distress_request",
  triggerCondition: "trend_up" | "trend_down" | "any",
  promptText: string,             // supports {businessName} interpolation
  options: [
    {
      label: string,
      effect: {
        cashChange?: string,       // e.g. "-followOnAmount", "+offerAmount"
        equityPercentChange?: string,  // e.g. "+amount", "-dilutionAmount"
        statusChange?: string
      }
    }
  ]
}
```

### Game State / Save File (`state/gameState.js`)

```js
{
  saveVersion: number,        // bump on any schema change; loadGame()
                               // checks this and discards stale saves
                               // rather than crashing
  turn: number,
  cash: number,
  netWorthHistory: number[],
  points: { available: number, max: number },
  industry: string,            // single value in demo; full game needs
                                // unlockedIndustries: string[] instead
  portfolio: Holding[],
  eventQueue: Event[],         // always empty in demo, seam for later
  diligenceLog: {              // pitchId -> diligence results, reset each turn
    [pitchId]: { backgroundCheck, deepDive }
  },
  currentPitches: Pitch[],
  currentNews: News[],
  gameOver: boolean
}
```

---

## Turn Resolution Flow (implemented in `engine/turnResolution.js`)

1. Pop/resolve any queued portfolio events (currently a no-op — queue is
   always empty in the demo).
2. Display this turn's news (general + current industry).
3. Generate 2-3 pitches for the dashboard.
4. Player spends points on background checks / deep dives, makes
   invest/pass decisions.
5. Every **active** portfolio holding rolls its turn performance
   (`outcomeWeights` + summed trait `outcomeNudge`s → weighted random
   outcome type → multiplier applied to `currentValueMultiplier`).
6. Operating cost deducted from cash.
7. Any `exit_pending` holdings clear to cash at whatever their value ended
   up at this turn (friction: the delay, not a penalty — value could have
   moved during the pending turn).
8. Net worth recalculated (cash + active/pending portfolio value), pushed
   to `netWorthHistory`.
9. Loss check: net worth <= 0 ends the game.
10. Turn advances; points refresh; diligence log resets; next turn's news
    and pitches generate.

---

## Content Volume Targets (for the upcoming content-writing pass)

Discussed and sanity-checked, not yet written:

- **Pitch bank**: 15-20 unique business templates (currently 2 stub entries
  in `data/pitches.js`). At 2-3 pitches/turn over an 8-10 turn demo, this
  avoids visible repeats within a single playthrough. Note this is now
  slightly easier to write than originally scoped — each template needs a
  `possibleTraitPool` (a small list of plausible traits) rather than a
  single fixed `traits` array, since the engine rolls the actual subset.
- **News bank**: 8-12 items total, roughly half general / half
  industry-specific. Only ~4-5 should tie to actual traits via
  `relevantTraits` — the rest should be deliberate noise/flavor, so players
  learn not every headline is a solvable clue.
- **Trait bank**: 5-8 distinct traits (currently 3 stub entries in
  `data/traits.js`), spanning different categories (personality, history,
  process, financial, legal) so diligence reveals genuinely different
  *kinds* of information pitch to pitch, not reskins of the same lie.

---

## Path to Full Game (sequencing notes)

Roughly in the order these were discussed as natural next layers, each
designed to slot into the existing schema without restructuring it:

1. **Portfolio events** — the most self-contained next system. Populate
   `eventQueue`, build the generic event resolver, wire dilution-on-decline
   for follow-on requests. No changes needed to pitches/news/traits.
2. **Negotiation** — extends the investment decision step (currently a flat
   yes/no) into counter-offers + a founder happiness meter + deal structure
   choice. Touches `PitchCard` UI and adds fields to the investment flow,
   doesn't require changes to the diligence or news systems.
3. **Multiple industries** — change `industry: string` to
   `unlockedIndustries: string[]` in game state, expand pitch/news/trait
   banks per industry, ensure `generatePitchesForTurn` and
   `getNewsForTurn` filter correctly across multiple industries (they're
   already written industry-aware, just currently fed a single value).
4. **Upgrades / progression** — modify `points.max`, unlock industries,
   improve negotiation odds. These are state mutations triggered by
   milestones, not new architectural systems.
5. **Leveling (amateur → global capitalist)** — primarily a pacing/UI layer
   on top of net worth + turn count; unlocks bigger deal sizes and later
   mechanics (LBOs, board seats, distressed turnarounds) gated behind tier.
6. **Rival investors, market-wide cycles, crisis events** — least specified
   currently; will need their own design pass when reached.

---

## Open Design Questions (not yet resolved, worth revisiting)

- Should `archetype` eventually drive AI-generated pitch flavor text/voice,
  or stay a fixed enum with hand-written variants? Relevant once content
  volume scales past what's comfortable to hand-write.
- News-to-trait relevance is currently binary (a news item either lists a
  trait in `relevantTraits` or doesn't). Full game discussion floated an
  optional second layer of *ambient sector sentiment* (probabilistic, not
  explicit) — intentionally deferred until the explicit version is proven
  fun first.
- TypeScript migration — not necessary for the demo, but worth considering
  before the data schema grows much further (portfolio events + negotiation
  + multi-industry will meaningfully increase the object shapes in play).
