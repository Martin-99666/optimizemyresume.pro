// 支持的语言列表
export const locales = [
  'en',    // English
  'zh-CN', // 中文简体
  'zh-TW', // 中文繁體
  'ja',    // 日本語
  'ko',    // 한국어
  'de',    // Deutsch
  'fr',    // Français
  'it',    // Italiano
  'es'     // Español
] as const

export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'zh-CN'