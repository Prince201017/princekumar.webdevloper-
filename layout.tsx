import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { QuickNav } from "@/components/quick-nav"
import { CartPanel } from "@/components/cart-panel"
import "./globals.css"

export const metadata: Metadata = {
  title: "Eloura - Modern Luxury Fashion",
  description: "Discover the latest Eloura collections. Minimalist design meets modern luxury.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <QuickNav />
        <CartPanel />
        <Analytics />
      </body>
    </html>
  )
}
