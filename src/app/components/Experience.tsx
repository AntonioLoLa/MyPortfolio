'use client';

import { useTranslations } from 'next-intl';

export default function Experience() {
  const t = useTranslations('experience');

  const experiencias: {
    puesto: string;
    empresa: string;
    fecha: string;
    descripcion: string;
  }[] = t.raw('items');

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-0 mt-12">
      <h2 className="text-3xl font-bold mb-6 text-white">{t('title')}</h2>

      <div className="flex flex-col gap-6">
        {experiencias.map((exp, i) => (
          <div
            key={i}
            className="border-l-4 border-blue-500 pl-4 py-4 bg-[#1a1a1a] shadow-md rounded-md"
          >
            <h3 className="text-lg font-semibold text-white">{exp.puesto}</h3>
            <p className="text-sm text-gray-400">{exp.empresa}</p>
            <p className="text-sm italic text-gray-500 mb-2">{exp.fecha}</p>
            <p className="text-sm text-gray-300">{exp.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
