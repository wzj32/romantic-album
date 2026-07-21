export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      title: '致最爱的你 - 专属浪漫相册',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '只为你一个人绽放的美丽' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  compatibilityDate: '2024-11-01'
})
