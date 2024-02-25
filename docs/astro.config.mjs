import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'UnoRN',
      customCss: [
        './src/styles/custom.css',
        '@fontsource/noto-sans/400.css',
      ],
      logo: {
        src: './src/assets/logo.png',
      },
      social: {
        github: 'https://github.com/BuiltCat/unocss-native',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'React Native (default)',
          autogenerate: { directory: 'preset-react-native' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
})
