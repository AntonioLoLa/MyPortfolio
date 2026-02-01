'use client';

import { useTranslations } from 'next-intl';
import { Briefcase, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type Experiencia = {
  puesto: string;
  empresa: string;
  fecha: string;
  responsabilidades: string[];
};

export default function Experience() {
  const t = useTranslations('experience');
  const experiencias = t.raw('items') as Experiencia[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('title')}
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Timeline */}
        <motion.div
          className="space-y-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {experiencias.map((exp, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative pl-8 sm:pl-12"
            >
              {/* Timeline line */}
              {i < experiencias.length - 1 && (
                <div className="absolute left-6 top-20 h-16 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
              )}

              {/* Glow background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm group-hover:border-blue-400/30 transition-all duration-300">
                {/* Timeline icon */}
                <div className="absolute -left-4 top-6 bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
                  <Briefcase size={20} className="text-white" />
                </div>

                {/* Content */}
                <div className="pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {exp.puesto}
                    </h3>
                    <span className="text-sm text-slate-400 font-medium italic">{exp.fecha}</span>
                  </div>

                  <p className="text-sm text-blue-300 font-semibold mb-4">{exp.empresa}</p>

                  {/* Responsibilities */}
                  <ul className="space-y-2">
                    {exp.responsabilidades.map((r, j) => (
                      <li key={j} className="flex gap-2 text-slate-300 text-sm leading-relaxed group/item">
                        <CheckCircle
                          size={16}
                          className="text-green-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform"
                        />
                        <span className="group-hover/item:text-white transition-colors">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
