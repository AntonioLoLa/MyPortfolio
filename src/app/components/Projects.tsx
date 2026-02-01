'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';

type Proyecto = {
  title: string;
  description: string;
  tech: string[];
  codeLink?: string;
  demoLink?: string;
};

export default function Projects() {
  const t = useTranslations('projects');
  const proyectos = t.raw('items') as Proyecto[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('title')}
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          <p className="text-slate-400 mt-4 text-lg">{'Proyectos destacados'}</p>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {proyectos.map((proj, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 z-0"></div>

              {/* Card container */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col z-10 backdrop-blur-sm">
                {/* Card header */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 flex-1">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {index < 3 && (
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    )}
                    {index === proyectos.length - 1 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow line-clamp-3 group-hover:text-gray-200 transition-colors">
                  {proj.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="inline-block text-blue-200 text-xs px-3 py-1 rounded-full border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group-hover:bg-blue-500/30"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(proj.codeLink || proj.demoLink) && (
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                    {proj.codeLink && (
                      <a
                        href={proj.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300 group/link"
                      >
                        <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                        <span>{t('code')}</span>
                      </a>
                    )}
                    {proj.demoLink && (
                      <a
                        href={proj.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 group/link ml-auto"
                      >
                        <span>Demo</span>
                        <ExternalLink size={16} className="group-hover/link:scale-110 group-hover/link:translate-x-1 transition-all" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </motion.div>
      </div>
    </section>
  );
}
