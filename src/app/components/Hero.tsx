'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const cvHref =
    locale === 'es'
      ? '/CV/CV_ES-ANTONIO_LOZANO_LARRUBIA.pdf'
      : '/CV/CV_EN-ANTONIO_LOZANO_LARRUBIA.pdf';

  return (
    <section
      className="flex flex-col items-center text-center pt-24 pb-12 gap-4 sm:gap-5"
      aria-labelledby="hero-title"
    >
      
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden ring-2 ring-white/10 shadow-md">
        <Image
          src="/personal_photo.jpg"
          alt={t('photo_alt') || 'Foto de Antonio Lozano'}
          fill
          sizes="(max-width: 640px) 128px, 160px"
          className="object-cover [object-position:50%_18%]"
          priority
        />
      </div>

      <h1
        id="hero-title"
        className="text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {t.rich('greeting', {
          name: (chunks) => <span className="text-blue-600">{chunks}</span>,
        })}
      </h1>

      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
        <span className="block font-semibold text-white">
          Full Stack Engineer
        </span>
      </p>


      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="#contact"
          className="px-6 py-2 rounded-full font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform hover:scale-[1.03]"
          aria-label={t('cta_contact_aria') || 'Ir a la sección de contacto'}
        >
          {t('contact')}
        </Link>

       <Link
        href="#projects"
        className="px-6 py-2 rounded-full font-medium text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
        hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 
        focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform hover:scale-[1.03] shadow-md shadow-indigo-500/30"
        aria-label={t('cta_projects_aria') || 'Ver proyectos'}
      >
        {t('see_projects') || 'Ver proyectos'}
      </Link>

      <a
        href={cvHref}
        download
        className="px-6 py-2 rounded-full font-medium text-white bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 
        hover:from-rose-500 hover:via-red-500 hover:to-orange-500 
        focus:outline-none focus:ring-2 focus:ring-rose-400 transition-transform hover:scale-[1.03] shadow-md shadow-rose-500/30"
        aria-label={t('cta_cv_aria') || 'Descargar CV'}
      >
        {t('download_cv') || 'Descargar CV'}
      </a>

      </div>
    </section>
  );
}
