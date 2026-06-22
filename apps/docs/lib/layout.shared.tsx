import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // Brand sailboat + wordmark. Two img tags swapped by Tailwind
      // dark variant so the logo stays readable in both themes —
      // white on the dark default, black on the cream light mode.
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/brand/pinace-logo-white.svg"
            alt=""
            width={20}
            height={20}
            className="hidden dark:block"
            aria-hidden
          />
          <img
            src="/brand/pinace-logo-black.svg"
            alt=""
            width={20}
            height={20}
            className="block dark:hidden"
            aria-hidden
          />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
