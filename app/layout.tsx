import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Analytics from "@/components/analytics"
import { Suspense } from "react"

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Секрет - Иллюзионное шоу Дмитрия Костюка | Билеты онлайн",
    template: "%s | Шоу СЕКРЕТ",
  },
  description:
    "Погрузитесь в мир невозможного. Премиальное иллюзионное шоу Дмитрия Костюка в Ярославле. Левитация, телепатия, трансформация реальности. Купить билеты онлайн от 1500₽.",
  keywords: [
    "иллюзионист",
    "шоу",
    "магия",
    "Дмитрий Костюк",
    "билеты",
    "Ярославль",
    "фокусы",
    "иллюзии",
    "театр",
    "представление",
    "левитация",
    "телепатия",
    "трансформация",
    "премиум шоу",
    "волшебство",
  ],
  authors: [{ name: "Дмитрий Костюк", url: "https://secret-show.ru" }],
  creator: "Дмитрий Костюк",
  publisher: "Театр Волшебство",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://secret-show.ru"),
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
    },
  },
  openGraph: {
    title: "Секрет - Иллюзионное шоу Дмитрия Костюка",
    description: "Тайна, которую осмелишься увидеть. Премиальное иллюзионное шоу в Ярославле.",
    url: "https://secret-show.ru",
    siteName: "Шоу СЕКРЕТ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Иллюзионное шоу СЕКРЕТ - Дмитрий Костюк",
      },
      {
        url: "/magic-show-trailer.png",
        width: 800,
        height: 600,
        alt: "Трейлер шоу СЕКРЕТ",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Секрет - Иллюзионное шоу Дмитрия Костюка",
    description: "Тайна, которую осмелишься увидеть",
    creator: "@secret_show_ru",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "entertainment",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-serif: ${playfair.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <Analytics />
          {children}
        </Suspense>
      </body>
    </html>
  )
}
