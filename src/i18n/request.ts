import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

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

export default getRequestConfig(async ({ locale }) => {
  // 验证传入的 locale 参数
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})