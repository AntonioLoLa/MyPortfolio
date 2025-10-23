'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export default function Projects() {
  const t = useTranslations('projects');
  const proyectos = t.raw('items');

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
        {t('title')}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((proj: any, index: number) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-400/40 transition"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {proj.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4">{proj.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(proj.tech) &&
                proj.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-400/20"
                  >
                    {t}
                  </span>
                ))}
            </div>

            {(proj.codeLink || proj.demoLink) && (
              <div className="flex items-center gap-3 mt-2">
                {proj.codeLink && (
                  <a
                    href={proj.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium transition"
                  >
                    <Github size={16} />
                    {t('code')}
                  </a>
                )}

                {proj.demoLink && (
                  <a
                    href={proj.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                  >
                    <ExternalLink size={16} />
                    Link
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
