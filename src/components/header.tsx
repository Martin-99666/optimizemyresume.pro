import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('header')

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {t('title')}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {t('subtitle')}
      </p>
    </div>
  )
}