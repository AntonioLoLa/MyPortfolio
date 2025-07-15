'use client';

import { useTranslations } from 'next-intl';

export default function Languages() {
  const t = useTranslations('languages');

  const idiomas: { name: string; level: keyof typeof nivelToPorcentaje }[] = t.raw('items');

  const nivelToPorcentaje = {
    A1: 17,
    A2: 34,
    B1: 52,
    B2: 70,
    C1: 85,
    C2: 100
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-0 mt-12">
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>

      <div className="flex flex-col gap-4">
        {idiomas.map((idioma, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{idioma.name}</span>
              <span>{idioma.level}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-blue-500 rounded transition-all duration-300"
                style={{
                  width: `${nivelToPorcentaje[idioma.level] || 0}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
