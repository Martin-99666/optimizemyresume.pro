import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Optimizer Pro',
  description: 'Optimize your resume with AI technology to improve job search success',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}