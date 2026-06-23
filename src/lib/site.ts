export const siteConfig = {
  name: 'Antonio Lozano Larrubia',
  shortName: 'Antonio Lozano',
  url: 'https://antoniolola-portfolio.vercel.app',
  email: 'antoniolozanolarrubia@gmail.com',
  phone: '+34 644 959 736',
  location: 'Sabadell, Barcelona, Spain',
  social: {
    github: 'https://github.com/AntonioLoLa',
    linkedin: 'https://www.linkedin.com/in/antonio-lozano-larrubia',
  },
  cv: {
    en: '/CV/CV_EN-ANTONIO_LOZANO_LARRUBIA.pdf',
    es: '/CV/CV_ES-ANTONIO_LOZANO_LARRUBIA.pdf',
  },
} as const;

export function cvHref(locale: string): string {
  return locale === 'es' ? siteConfig.cv.es : siteConfig.cv.en;
}
