import Link from 'next/link';

const FEATURES = [
  {
    title: 'Bounded delegation',
    body: 'Fund a BalancePool, attach a policy (spending limit, slippage, window). The agent acts inside those bounds — Move reverts anything outside.',
  },
  {
    title: 'One-click revoke',
    body: 'Owner kills the agent on-chain with a single signed tx. Next propose_action reverts with E_REVOKED. Verifiable on the explorer.',
  },
  {
    title: 'Wallet-standard signing',
    body: 'Custom `pinace:connectAgent` + `pinace:signAndExecuteAsAgent` features. Any wallet-standard dApp can drive an agent with two RPCs.',
  },
];

const PACKAGES = [
  {
    pkg: '@pinace/core',
    who: 'PTB builders + on-chain types + read client',
    href: 'https://www.npmjs.com/package/@pinace/core',
  },
  {
    pkg: 'Pinace Wallet',
    who: 'Owner UI, BalancePool ops, policy management, agent sign approvals',
    href: 'https://github.com/pinace-wallet/frontend',
  },
  {
    pkg: 'Pinace Indexer',
    who: 'REST + SSE over agents / pools / policies / actions',
    href: '/docs/indexer/overview',
  },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center px-4 py-20 sm:py-28">
      <div
        aria-hidden
        className="bg-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
      />

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
        Pinace · Build on Sui
      </p>
      <h1 className="max-w-3xl text-balance text-center text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
        AI agents that trade for users,{' '}
        <span className="text-gradient">never holding their keys</span>
      </h1>
      <p className="mt-5 max-w-xl text-center text-fd-muted-foreground sm:text-lg">
        Pinace is the autonomous-agent wallet on Sui. Build chat
        agents, MCP servers, or DeFi automations against one
        policy-bounded surface — funds stay in the user&apos;s pool,
        every action is reversible on chain.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="rounded-full bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
        >
          Read the docs →
        </Link>
        <Link
          href="/docs/quickstart"
          className="rounded-full border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
        >
          Quickstart
        </Link>
        <a
          href="https://github.com/pinace-wallet"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
        >
          GitHub
        </a>
      </div>

      <div className="mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-fd-border bg-fd-card p-5 text-left"
          >
            <h3 className="font-medium">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 w-full max-w-4xl">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.16em] text-fd-muted-foreground">
          The Pinace stack
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PACKAGES.map((p) => (
            <Link
              key={p.pkg}
              href={p.href}
              className="group flex flex-col gap-2 rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-fd-primary">
                  {p.pkg}
                </span>
                <span className="pill-live rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  live
                </span>
              </div>
              <p className="text-sm leading-snug text-fd-muted-foreground">
                {p.who}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-fd-muted-foreground">
        Today Pinace gates DeepBook v3 swaps on Sui testnet.{' '}
        <Link
          className="text-fd-primary hover:underline"
          href="/docs/integrations"
        >
          Cetus, Scallop, Aftermath, NAVI and more coming →
        </Link>
      </p>
    </main>
  );
}
