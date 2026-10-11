import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Newsreader } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';

// Display face only; headlines and their italic annotations come from the same family.
// Self-hosted by next/font at build time. The optical-size axis is left out on purpose:
// it more than doubles each file (≈132 KB → 58 KB) for a refinement nobody sees on a
// phone. The italic is a separate, non-preloaded file, off the critical path.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});
const newsreaderItalic = Newsreader({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-display-italic',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#F1EDE4',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const path = locale === routing.defaultLocale ? '/' : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: path,
      languages: { en: '/', es: '/es', 'x-default': '/' },
    },
    openGraph: {
      type: 'profile',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: path,
      title: t('title'),
      description: t('description'),
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Software Engineer',
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Sabadell', addressRegion: 'Barcelona', addressCountry: 'ES' },
    worksFor: { '@type': 'Organization', name: 'EXTE' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitat Autònoma de Barcelona' },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    knowsAbout: ['Backend engineering', 'Python', 'FastAPI', 'Machine learning', 'MLOps', 'LLM agents', 'Geospatial software'],
  };

  return (
    // suppressHydrationWarning: the inline script below adds `js` to <html> before React
    // hydrates, so its className legitimately differs from the server's. Applies to this
    // element's attributes only, not to its children.
    <html
      lang={locale}
      className={`${newsreader.variable} ${newsreaderItalic.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables first-view motion only when JS runs; without it figures render final. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
