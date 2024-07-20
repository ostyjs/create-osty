import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Osty',
  description: 'Framework for building Nostr web applications',

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Osty | Framework for building Nostr web applications' }],
    ['meta', { property: 'og:site_name', content: 'Osty' }],
    ['meta', { property: 'og:image', content: 'https://osty.dev/osty-og.png' }],
    ['meta', { property: 'og:url', content: 'https://osty.dev/' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/osty.png',

    nav: [
      { text: 'Guide', link: '/guide/what-is-osty' },
      { text: 'Templates', link: '/templates/what-are-templates' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Osty?', link: '/guide/what-is-osty' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
      ],

      '/templates/': [
        {
          text: 'Templates',
          items: [
            { text: 'What are templates?', link: '/templates/what-are-templates' },
            { text: 'React + Shadcn', link: '/templates/react-shadcn' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/ostyjs/create-osty' }],
  },
});
