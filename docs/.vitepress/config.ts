import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Osty',
  base: '/create-osty/',
  description: 'Framework for building Nostr web applications',
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
