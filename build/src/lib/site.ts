// Single source of content for the landing page (AGENTS.md §6).
// Product facts come from ../../docs/landing-page-plan.md — do not invent claims.

export const site = {
  name: "Pinace",
  tagline: "The Autonomous Agent Wallet on Sui",
  chromeStoreUrl: "#install",
  // Live fumadocs site on Railway.
  docsUrl: "https://pinace-docs-production.up.railway.app",
  githubUrl: "https://github.com/pinace-wallet",
  // Fenik — Pinace's reference agent POC. Conversational chat app
  // that runs bounded DeepBook swaps via @pinace/agent-sdk. Live on
  // fenik.one (AWS EC2 + Cloudflare TLS).
  pocAgentUrl: "https://fenik.one",
  pocAgentLive: true,
  nav: [
    { label: "Products", href: "#products" },
    { label: "How it works", href: "#how" },
    { label: "Build", href: "#ideas" },
    { label: "Developers", href: "#developers" },
  ],
} as const;

export const hero = {
  badge: "Built on Sui",
  status: "Browser extension · early access",
  // headline is rendered as reveal rows; last word is the drenched-blue accent.
  headlineRows: ["Let AI trade", "for you — without", "handing over"],
  headlineAccent: "your keys.",
  sub: "Give an AI agent a budget and a rulebook, not your private key. Pinace keeps funds in your on-chain pool, enforces every limit with Move, and lets you revoke access in one click.",
  primaryCta: { label: "Add to Chrome", href: "#install" },
  secondaryCta: { label: "View docs", href: "#developers" },
} as const;

export const steps = [
  {
    n: "01",
    title: "Deposit to a BalancePool",
    body: "Fund an on-chain escrow once. Agents only ever touch the pool — never your main wallet.",
  },
  {
    n: "02",
    title: "Set the policy",
    body: "Cap budget, allowed tokens, action types, slippage and expiry. The rulebook lives on-chain.",
  },
  {
    n: "03",
    title: "The agent acts within bounds",
    body: "Every action runs as a hot-potato PTB: propose_action → settle. Break a rule and the whole tx reverts.",
  },
  {
    n: "04",
    title: "Revoke anytime",
    body: "One click burns the agent's authority. Its next transaction fails on-chain with E_REVOKED.",
  },
] as const;

export const features = [
  {
    title: "On-chain policy guardrails",
    body: "Budget ceilings, token whitelists, slippage guards and expiry windows — enforced by Move, not by trust.",
  },
  {
    title: "BalancePool escrow",
    body: "Your keys never leave your wallet. Agents operate inside a bounded pool you fund and own.",
  },
  {
    title: "One-click revoke",
    body: "Kill an agent's access instantly. The next propose_action reverts with E_REVOKED on Sui.",
  },
  {
    title: "Audit timeline",
    body: "An indexer streams every action — success, reverted, pending — with explorer links you can verify.",
  },
  {
    title: "Hot-potato settlement",
    body: "Propose → policy check → settle, all in one atomic PTB. Break any rule and the whole transaction reverts.",
  },
  {
    title: "Per-window spending cap",
    body: "Cap spending per transaction and per time window. Move enforces the math on every swap.",
  },
] as const;

// Only what the Pinace codebase actually builds on (from package.json + imports).
export const suiPrimitives = [
  "Sui Move",
  "@mysten/sui",
  "Sui Wallet Standard",
  "@mysten/dapp-kit",
  "DeepBook v3",
  "BCS · codegen",
] as const;

export const team = [
  { name: "Hulk", role: "Wallet UI · Contracts · Market" },
  { name: "Wyner", role: "Contracts · Indexer · Agent SDK" },
  { name: "John", role: "SDK · Indexer" },
  { name: "Ikaris", role: "SDK integration · Wallet UI" },
] as const;

export const sdkTiers = [
  {
    pkg: "@pinace/core",
    who: "PTB builders, on-chain types & read client",
    status: "published" as const,
    href: "https://www.npmjs.com/package/@pinace/core",
  },
  {
    pkg: "@pinace/agent-sdk",
    who: "Agent builders (LangChain, AutoGen, Eliza)",
    status: "coming-soon" as const,
  },
  {
    pkg: "@pinace/mcp-server",
    who: "LLM tool use (Claude, GPT) — MCP compliant",
    status: "coming-soon" as const,
  },
] as const;

export const sdkSnippet = `import { ActionKind, buildProposeAction, buildSettleAction, PACKAGE_IDS } from "@pinace/core";
import { buildPolicyProves, spendingLimit, tokenWhitelist } from "@pinace/core/policies";

// Agent proposes an action inside the pool you fund and own.
const request = buildProposeAction({
  tx, poolId,
  packageId: PACKAGE_IDS.testnet,
  kind: ActionKind.Swap,
  coinInType: "0x2::sui::SUI",
  coinOutType: USDC,
  amountIn: 100_000_000n,
  minAmountOut: 98_000_000n,
  deadlineMs: BigInt(Date.now() + 60_000),
});`;

export const modelStats = [
  { to: 1, suffix: " click", label: "to revoke an agent" },
  { to: 100, suffix: "%", label: "on-chain enforcement" },
  { to: 0, suffix: "", label: "keys ever shared" },
] as const;

// Core features rendered as 3D tilt cards (mirrors the reference's services grid).
export const featureCards = [
  {
    n: "01",
    tone: "blue" as const,
    kicker: "Enforcement",
    title: "On-chain policy guardrails",
    body: "Budget ceilings, token whitelists, slippage guards and expiry windows — checked by Move on every action, not by trust.",
    tags: ["Budget", "Whitelist", "Slippage", "Expiry"],
  },
  {
    n: "02",
    tone: "teal" as const,
    kicker: "Custody",
    title: "BalancePool escrow",
    body: "Your keys never leave your wallet. Agents operate inside a bounded pool you fund and own — and nothing else.",
    tags: ["Non-custodial", "Owned", "Bounded"],
  },
  {
    n: "03",
    tone: "pink" as const,
    kicker: "Control",
    title: "One-click revoke",
    body: "Kill an agent's authority instantly. Its next propose_action reverts with E_REVOKED on Sui — verifiable on the explorer.",
    tags: ["Instant", "On-chain", "E_REVOKED"],
  },
  {
    n: "04",
    tone: "violet" as const,
    kicker: "Transparency",
    feature: true,
    title: "Audit timeline",
    body: "An indexer streams every action — proposed, settled, reverted — with Suiscan links. You watch each fill land on chain in real time and can dispute or revoke any moment.",
    tags: ["Indexed", "Real-time SSE", "Suiscan links"],
  },
] as const;

// Capability columns (mirrors the reference's "domaines" 3-column lists).
export const capabilities = [
  {
    tone: "blue" as const,
    title: "Agent actions",
    items: [
      "Swap on DeepBook v3",
      "Dollar-cost-average (DCA)",
      "Limit & market orders",
      "Stake and manage positions",
      "Rebalance within a budget",
      "Bounded, repeatable strategies",
    ],
  },
  {
    tone: "teal" as const,
    title: "Policy controls",
    items: [
      "Per-tx & daily budget caps",
      "Token allow-lists",
      "Allowed action types",
      "Max slippage guard",
      "Time window & expiry",
      "Composable policy templates",
    ],
  },
  {
    tone: "pink" as const,
    title: "Safety guarantees",
    items: [
      "Hot-potato PTB settlement",
      "Atomic propose → settle",
      "Whole-tx revert on violation",
      "One-click on-chain revoke",
      "Bounded blast radius",
      "Full indexed audit trail",
    ],
  },
] as const;

// Example third-party agents/apps a user grants pool access to (NOT built by Pinace).
// `fn` = what each does *through the Pinace protocol*, revealed on hover.
export const useCases = [
  {
    k: "Fenik",
    tone: "blue" as const,
    img: "/agents/fenik.png",
    avatar: "/agents/deepage.svg",
    tag: "Proof of concept · trading",
    fn: "Chat with an agent that quotes DeepBook, checks your policy, and submits the swap — all in one signed PTB.",
    meta: "PoC · live",
    desc: "Pinace's reference agent. You chat — Fenik quotes DeepBook, pre-flights your spending limit, and asks Pinace Wallet to sign one atomic PTB. Every swap stays inside the budget you set.",
    tags: ["PoC", "DeepBook v3", "Conversational", "Bounded"],
  },
  {
    k: "DeepAge",
    tone: "pink" as const,
    img: "/agents/app-detail.png",
    avatar: "/agents/deepage.svg",
    tag: "Example agent · trading",
    fn: "Runs DCA swaps on DeepBook v3 — only within the budget, token list and slippage policy you grant.",
    meta: "Trading",
    desc: "An example trading agent. You deposit into a pool and grant it a swap policy; it then dollar-cost-averages on DeepBook v3 inside those exact bounds, and you watch every fill on the timeline. Revoke any time.",
    tags: ["Grant-scoped", "DeepBook v3", "Auto-DCA"],
  },
  {
    k: "KuanQue",
    tone: "teal" as const,
    img: "/agents/app-agents.png",
    avatar: "/agents/kuanque.svg",
    tag: "Example app · liquidity",
    fn: "Rebalances an LP position automatically — capped by the budget and token whitelist on your pool.",
    meta: "Liquidity",
    desc: "An example liquidity app a user registers to manage a position. It rebalances automatically within the policy you set; when its job is done the status flips to Done, and access ends the moment you revoke.",
    tags: ["Grant-scoped", "Rebalance", "Revocable"],
  },
  {
    k: "MBO",
    tone: "blue" as const,
    img: "/agents/app-home.png",
    avatar: "/agents/mbo.svg",
    fn: "Idle until you grant a policy — then acts on-demand, never able to touch funds outside its scope.",
    tag: "Example agent · on-demand",
    meta: "On-demand",
    desc: "An example on-demand agent. It stays idle until you deposit a pool and confirm a policy grant. From then on it transacts automatically within scope — and can never reach funds the policy doesn't allow.",
    tags: ["Grant-scoped", "On-demand", "Bounded"],
  },
] as const;

// The three core products — concise painpoint → what Pinace provides (text-only).
export const products = [
  {
    tone: "blue" as const,
    name: "Wallet",
    tag: "Browser extension",
    pain: "Letting an app trade for you used to mean handing over your keys, or signing every single transaction.",
    give: "A non-custodial wallet where you grant a scoped policy, watch the agent work in real time, and revoke in one click.",
  },
  {
    tone: "violet" as const,
    name: "Protocol",
    tag: "Move contracts on Sui",
    pain: "Sui has no allowances or session keys, so delegated authority couldn't be bounded natively — it was all or nothing.",
    give: "A BalancePool escrow and policy objects where the Move compiler itself enforces your budget on every atomic transaction.",
  },
  {
    tone: "teal" as const,
    name: "SDK",
    tag: "TypeScript",
    pain: "Builders had no standard, safe way to let an agent act on a user's funds, or to ship a reusable policy.",
    give: "A three-tier SDK — wallet, agent, and MCP — that takes you from intent to settled transaction in a few lines.",
  },
] as const;

// Ideas developers can build on the protocol.
export const ideas = [
  {
    icon: "TrendingUp",
    title: "DCA & TWAP bots",
    body: "Schedule bounded buys across DeepBook, hands-off.",
  },
  {
    icon: "Scale",
    title: "Yield rebalancers",
    body: "Keep an LP position in range, within a budget.",
  },
  {
    icon: "ShieldCheck",
    title: "Stop-loss guardian",
    body: "An agent that only ever exits — never adds risk.",
  },
  {
    icon: "Banknote",
    title: "Payroll & subscriptions",
    body: "Streaming payments capped by policy and time.",
  },
  {
    icon: "Landmark",
    title: "Treasury management",
    body: "Delegate idle treasury to a scoped strategy agent.",
  },
  {
    icon: "RefreshCcw",
    title: "Copy-trading",
    body: "Mirror a strategy with your own budget ceiling.",
  },
  {
    icon: "Bot",
    title: "MCP tool for LLMs",
    body: "Give Claude or GPT a revocable on-chain wallet.",
  },
  {
    icon: "ShoppingCart",
    title: "Agentic checkout (AP2)",
    body: "Intent → cart → payment, bounded on-chain.",
  },
] as const;

export const faqs = [
  {
    q: "Do I give the agent my private key?",
    a: "No. You fund a BalancePool and attach a policy. The agent uses its own scoped keypair to act inside that pool — your owner key never leaves your wallet.",
  },
  {
    q: "What happens when I revoke?",
    a: "Revocation is one on-chain transaction. The agent's authority is burned and its next propose_action reverts with E_REVOKED — visible on the Sui explorer.",
  },
  {
    q: "How are limits actually enforced?",
    a: "Every action runs as a hot-potato PTB: propose_action → settle in one atomic transaction. If it breaks budget, scope, slippage or expiry, the whole transaction reverts.",
  },
  {
    q: "Is there a mobile app?",
    a: "Early access of the browser extension is shipping now; mobile is on the roadmap. Join the waitlist below to be notified.",
  },
  {
    q: "Can I build my own policy or agent?",
    a: "Yes. The Pinace SDK ships a three-tier surface (wallet, agent, MCP). Developers can write a policy contract and publish it to the marketplace.",
  },
  {
    q: "Which networks and protocols are supported?",
    a: "Pinace runs on Sui testnet today, with mainnet next. The protocol gates any Sui Move call; the reference agent (Fenik) trades on DeepBook v3. More venues — Cetus, Aftermath — coming as the SDK matures.",
  },
] as const;
