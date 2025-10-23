'use client';

import { useTranslations } from 'next-intl';

export default function Profile() {
  const t = useTranslations('profile');

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        {t('title')}
      </h2>

      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
        {t('description')}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-300">
        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            {t('focus_title')}
          </h3>
          <p>{t('focus')}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            {t('methodologies_title')}
          </h3>
          <p>{t('methodologies')}</p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            {t('motivation_title')}
          </h3>
          <p>{t('motivation')}</p>
        </div>
      </div>
    </section>
  );
}
