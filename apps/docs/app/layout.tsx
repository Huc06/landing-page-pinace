import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

// Brand type — Pinace landing uses Inter; Outfit is close enough for
// docs and we keep JetBrains Mono for code blocks.
const sans = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001',
  ),
  title: { default: 'Pinace Docs', template: '%s · Pinace Docs' },
  description:
    'Build with Pinace — the autonomous-agent wallet on Sui. Wallet APIs, @pinace/core SDK, indexer, and venue integrations.',
  // Favicon comes from app/icon.png via file-convention — no manual
  // `icons` override here, otherwise it pins the link rel="icon"
  // back to the old SVG path that no longer exists.
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* Dark is the brand default; the toggle still flips to the cream light theme. */}
        <RootProvider theme={{ defaultTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
