'use client';

import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section className="mt-20 w-full text-center" id="contacto">
      <h2 className="text-xl font-medium mb-2">{t('title')}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {t('description')}{" "}
        <a
          href="mailto:antoniolozanolarrubia@gmail.com"
          className="underline text-blue-600 dark:text-blue-400"
        >
          antoniolozanolarrubia@gmail.com
        </a>
      </p>
    </section>
  );
}
