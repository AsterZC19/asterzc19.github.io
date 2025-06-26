import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    name: '钴蓝音',
    subtitle: '杂食游戏玩家 · 虚拟歌姬爱好者 · Ctrl C/V 高级工程师',
    links: {
      github: 'GitHub',
      twitter: 'Twitter',
      email: '邮箱'
    },
    welcome: '欢迎来自 {location} {provider} ({asn}) 的访客 ({ip})',
    locationError: '无法获取您的地理位置信息',
    language: '语言',
    switchToEn: 'English',
    switchToZh: '中文'
  },
  en: {
    name: 'RanonDust',
    subtitle: 'Omnivorous Gamer · Virtual Singer Enthusiast · Senior Ctrl C/V Engineer',
    links: {
      github: 'GitHub',
      twitter: 'Twitter',
      email: 'Email'
    },
    welcome: 'Welcome visitor from {location} {provider} ({asn}) ({ip})',
    locationError: 'Unable to get your location information',
    language: 'Language',
    switchToEn: 'English',
    switchToZh: '中文'
  }
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages
})

export default i18n
