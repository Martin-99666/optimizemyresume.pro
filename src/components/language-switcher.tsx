'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useMemo, useTransition } from 'react'
import { locales, type Locale } from '@/i18n'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const languageNames: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'ja': '日本語',
  'ko': '한국어',
  'de': 'Deutsch',
  'fr': 'Français',
  'it': 'Italiano',
  'es': 'Español'
} as const

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const currentLanguageName = languageNames[locale]

  const languageOptions = useMemo(() => 
    locales.map((lang) => ({
      value: lang,
      label: languageNames[lang],
      isActive: locale === lang
    })), [locale]
  )

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    startTransition(() => {
      try {
        const segments = pathname.split('/')
        segments[1] = newLocale
        const newPath = segments.join('/')
        router.push(newPath)
      } catch (error) {
        console.error('Failed to change language:', error)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={isPending}
          aria-label={`当前语言: ${currentLanguageName}. 点击选择其他语言`}
          className={cn(
            "min-w-[120px] justify-start",
            isPending && "opacity-50"
          )}
        >
          <Globe className="h-4 w-4 mr-2 shrink-0" />
          <span className="truncate">{currentLanguageName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languageOptions.map(({ value, label, isActive }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleLanguageChange(value)}
            disabled={isPending}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <span>{label}</span>
            {isActive && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}