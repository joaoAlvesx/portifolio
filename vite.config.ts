import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const site = new URL(loadEnv(mode, '.', 'VITE_').VITE_SITE_URL || 'https://portfolio.joaohomelab.site');
  if (!['http:', 'https:'].includes(site.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS');
  const base = site.origin;
  return {
    // Keep metadata in the HTML so social crawlers do not need JavaScript.
    server: { fs: { deny: ['.env', '.env.*', '*.pdf', '**/HOMELAB.md', '**/imagens/**'] } },
    plugins: [react(), {
      name: 'portfolio-metadata',
      transformIndexHtml() {
        return [
          { tag: 'link', attrs: { rel: 'canonical', href: base + '/' }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:url', content: base + '/' }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:image', content: base + '/images/social.webp' }, injectTo: 'head' as const },
        ];
      },
    }],
  };
});
