---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Osty
titleTemplate: Framework for building Nostr web applications

hero:
  name: 'Osty'
  text: 'Framework for building Nostr web applications'
  tagline: 'Start building on Nostr in seconds with Osty'
  image: /osty.png
  actions:
    - theme: brand
      text: What is Osty?
      link: /guide/what-is-osty
    - theme: alt
      text: Quick Start
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/ostyjs/create-osty
    - theme: alt
      text: Community
      link: https://t.me/ostyjs

features:
  - title: UI Components
    details: A comprehensive design system with reusable UI components.
  - title: Widgets
    details: Pre-built widgets like Zap Modal, Login Form, User Profile, Notes, and more.
  - title: Templates
    details: Ready-to-use templates for different social media platforms.
  - title: Core Libraries
    details: Efficient websockets, caching, routing, and state management solutions.
  - title: Best Practices
    details: Enhanced development experience and team collaboration.
  - title: Scalable
    details: Designed to scale with your needs. Works well for small projects and large projects alike.
---

<style>
:root {
  --vp-home-hero-name-color: transparent !important;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #802dd3 30%, #3367b7) !important;

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #802dd3 50%, #3367b7 50%) !important;
  --vp-home-hero-image-filter: blur(44px) !important;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px) !important;
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px) !important;
  }
}
</style>
