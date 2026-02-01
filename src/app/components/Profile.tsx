'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Cog, Rocket } from 'lucide-react';

export default function Profile() {
  const t = useTranslations('profile');

  const sections = [
    {
      icon: Target,
      title: t('focus_title'),
      content: t('focus'),
      gradient: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238))',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      icon: Cog,
      title: t('methodologies_title'),
      content: t('methodologies'),
      gradient: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      icon: Rocket,
      title: t('motivation_title'),
      content: t('motivation'),
      gradient: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(239, 68, 68))',
      borderColor: 'rgba(249, 115, 22, 0.3)',
    },
  ];

  return (
    <section id="profile" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('title')}
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16 group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line text-justify">
              {t('description')}
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className="group relative"
              >
                {/* Glow border */}
                <div 
                  className="absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{ background: section.gradient }}
                ></div>

                {/* Card */}
                <div 
                  className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border rounded-lg p-6 backdrop-blur-sm group-hover:border-opacity-100 transition-all duration-300 h-full flex flex-col"
                  style={{ borderColor: section.borderColor }}
                >
                  {/* Icon container */}
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg group-hover:from-blue-500/40 group-hover:to-indigo-500/40 transition-all duration-300 w-fit">
                    <Icon size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </h3>

                  {/* Content */}
                  <p className="text-slate-300 leading-relaxed flex-grow group-hover:text-slate-200 transition-colors">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
