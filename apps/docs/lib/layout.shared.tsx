import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // White brand sailboat + wordmark, rendered as a flex row so
      // fumadocs lays it out as the nav title link.
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/brand/pinace-logo-white.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
          />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
