'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();

  // Selecciona el CV según idioma
  const cvFile =
    locale === 'es'
      ? '/CV/CV_ES-ANTONIO_LOZANO_LARRUBIA.pdf'
      : '/CV/CV_EN-ANTONIO_LOZANO_LARRUBIA.pdf';

  return (
    <section className="mt-20 w-full text-center" id="contacto">
      <h2 className="text-xl font-medium mb-2">{t('title')}</h2>

      <p className="text-gray-200 mb-4">
        {t('description')}{' '}
        <a
          href="mailto:antoniolozanolarrubia@gmail.com"
          className="underline text-blue-600"
        >
          antoniolozanolarrubia@gmail.com
        </a>
      </p>

      <div className="mt-4">
        <a
          href={cvFile}
          download
          className="inline-block rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={t('aria_label_cv') || 'Descargar CV de Antonio Lozano'}
        >
          {t('download_cv') || 'Descargar CV'}
        </a>
      </div>
    </section>
  );
}
