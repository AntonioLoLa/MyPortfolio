'use client';

import { useTranslations } from 'next-intl';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience() {
  const t = useTranslations('experience');
  const experiencias = t.raw('items');

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
        {t('title')}
      </h2>

      <div className="flex flex-col gap-6">
        {experiencias.map((exp: any, i: number) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-400/40 transition"
          >
            <div className="absolute -left-3 top-5 bg-blue-500 text-white p-1.5 rounded-full shadow-md">
              <Briefcase size={14} />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <h3 className="text-lg font-semibold text-white">{exp.puesto}</h3>
              <p className="text-sm italic text-gray-400">{exp.fecha}</p>
            </div>

            <p className="text-sm text-gray-400 font-medium mb-3">{exp.empresa}</p>

            <ul className="list-disc list-inside text-sm text-gray-300 leading-relaxed space-y-1">
              {Array.isArray(exp.responsabilidades) &&
                exp.responsabilidades.map((r: string, j: number) => (
                  <li key={j}>{r}</li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
