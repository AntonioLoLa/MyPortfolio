'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { User, BookOpen, Heart, Zap } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="w-full py-20">
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
          className="mb-12"
        >
          <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
            {t('description')}
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="text-pink-400" size={24} />
                <h3 className="text-lg font-bold text-white">{t('birthdate')}</h3>
              </div>
              <p className="text-slate-300">29/08/2003</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <User className="text-green-400" size={24} />
                <h3 className="text-lg font-bold text-white">{t('nationality')}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/flags/es.png"
                  alt="Bandera de España"
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-slate-300">{t('nationality_value')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Studies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12"
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="text-indigo-400" size={24} />
                <h3 className="text-lg font-bold text-white">{t('studies')}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300">{t('studies_value_1')}</p>
                <p className="text-slate-300">{t('studies_value_2')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-t border-slate-700 pt-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-400" size={28} />
            <h3 className="text-2xl font-bold text-white">{t('skills_title')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {t.raw('skills').map((item: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 group/skill"
              >
                <span className="text-blue-400 text-xl group-hover/skill:scale-125 transition-transform">▹</span>
                <span className="text-slate-300 group-hover/skill:text-white transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">{t('additional_title')}</h3>
          <ul className="space-y-2">
            {t.raw('additional').map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group/item"
              >
                <span className="text-green-400 text-lg group-hover/item:scale-125 transition-transform">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
