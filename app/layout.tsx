import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SoundProvider from "@/components/sound-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Yongkang Zou | AI Engineer",
  description: "AI Engineer specializing in LLMs, RAG systems, and intelligent agent workflows",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-pixel bg-deep-purple text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SoundProvider>
            <div className="cyberpunk-container">
              <div className="scanlines"></div>
              <div className="noise"></div>
              <div className="crt-screen">
                <Suspense>{children}</Suspense>
              </div>
            </div>
          </SoundProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
