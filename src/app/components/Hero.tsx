'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const cvHref =
    locale === 'es'
      ? '/CV/CV_ES-ANTONIO_LOZANO_LARRUBIA.pdf'
      : '/CV/CV_EN-ANTONIO_LOZANO_LARRUBIA.pdf';

  return (
    <section
      className="relative flex flex-col items-center text-center py-20 gap-8 min-h-[80vh] justify-center"
      aria-labelledby="hero-title"
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-5 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-5xl">
        {/* Profile image - improved */}
        <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden mx-auto mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-purple-400/30 to-pink-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-1 rounded-full border-2 border-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
          <Image
            src="/personal_photo.jpg"
            alt={t('photo_alt') || 'Foto de Antonio Lozano'}
            fill
            sizes="(max-width: 640px) 180px, 220px"
            className="object-cover [object-position:50%_18%] transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>

        {/* Main title with gradient */}
        <h1
          id="hero-title"
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mt-8 mb-4 leading-tight"
        >
          {t.rich('greeting', {
            name: (chunks) => (
              <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
                {chunks}
              </span>
            ),
          })}
        </h1>

        {/* Subtitle and role */}
        <div className="space-y-4 mb-10">
          <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Full Stack Engineer
          </p>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* CTA Buttons - improved */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <Link
            href="#contact"
            className="group relative px-8 py-3.5 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            aria-label={t('cta_contact_aria') || 'Ir a contacto'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/50"></div>
            <span className="relative flex items-center gap-2">
              {t('contact')}
              <ArrowDown size={18} className="transform group-hover:translate-y-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="#projects"
            className="group relative px-8 py-3.5 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            aria-label={t('cta_projects_aria') || 'Ver proyectos'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/50"></div>
            <span className="relative">{t('see_projects') || 'Ver proyectos'}</span>
          </Link>

          <a
            href={cvHref}
            download
            className="group relative px-8 py-3.5 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border border-slate-600"
            aria-label={t('cta_cv_aria') || 'Descargar CV'}
          >
            <div className="absolute inset-0 bg-slate-700/50 transition-all duration-300 group-hover:bg-slate-600/80"></div>
            <span className="relative">{t('download_cv') || 'Descargar CV'}</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-blue-400 opacity-70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
