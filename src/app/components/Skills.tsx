'use client';

import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations('skills');

  const lenguajes: string[] = t.raw('languages');
  const frameworks: string[] = t.raw('frameworks');
  const herramientas: string[] = t.raw('tools');
  const basesDatos: string[] = t.raw('databases');

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        {t('title')}
      </h2>

      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            {t('languages_title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {lenguajes.map((lang, i) => (
              <span
                key={i}
                className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            {t('frameworks_title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((fw, i) => (
              <span
                key={i}
                className="bg-purple-500/20 text-purple-300 text-sm px-3 py-1 rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            {t('tools_title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {herramientas.map((tool, i) => (
              <span
                key={i}
                className="bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full border border-green-500/30 hover:bg-green-500/30 transition"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-3">
            {t('databases_title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {basesDatos.map((db, i) => (
              <span
                key={i}
                className="bg-pink-500/20 text-pink-300 text-sm px-3 py-1 rounded-full border border-pink-500/30 hover:bg-pink-500/30 transition"
              >
                {db}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
