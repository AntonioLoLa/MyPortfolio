'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>

      <p className="text-gray-200 mb-4">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">
        <div>
          <h3 className="font-semibold mb-1">{t('birthdate')}</h3>
          <p>29/08/2003</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t('nationality')}</h3>
          <p>{t('nationality_value')}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t('studies')}</h3>
          <p>{t('studies_value_1')}</p>
          <p>{t('studies_value_2')}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t('contact')}</h3>
          <p>antoniolozanolarrubia@gmail.com</p>
          <p>+34 644 95 97 36</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">{t('skills_title')}</h3>
        <ul className="list-disc list-inside text-gray-300">
          {t.raw('skills').map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">{t('additional_title')}</h3>
        <ul className="list-disc list-inside text-gray-300">
          {t.raw('additional').map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
