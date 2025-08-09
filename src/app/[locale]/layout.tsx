import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { locales, type Locale } from '@/i18n'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ErrorBoundary } from '@/components/error-boundary'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  return {
    title: 'OptimizeMyResume Pro',
    description: 'AI-powered resume optimization to help you land your dream job',
    openGraph: {
      title: 'OptimizeMyResume Pro',
      description: 'AI-powered resume optimization to help you land your dream job',
      locale,
    },
  }
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // 验证语言参数
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // 获取翻译消息
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "srzx4dzuyn");
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground antialiased">
              <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-end items-center">
                  <LanguageSwitcher />
                </div>
              </header>
              <main>{children}</main>
            </div>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}