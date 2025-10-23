'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        {t('title')}
      </h2>


      <p className="text-gray-300 leading-relaxed text-lg mb-10 whitespace-pre-line">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 mb-10">
        <div>
          <h3 className="font-semibold text-blue-300 mb-2">
            {t('birthdate')}
          </h3>
          <p>29/08/2003</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-300 mb-2">
            {t('nationality')}
          </h3>
          <div className="flex items-center gap-2">
            <Image
              src="/flags/es.png"
              alt="Bandera de España"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span>Española</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-blue-300 mb-2">
            {t('studies')}
          </h3>
          <p>{t('studies_value_1')}</p>
          <p>{t('studies_value_2')}</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-300 mb-2">
            {t('contact')}
          </h3>
          <p>
            <a
              href="mailto:antoniolozanolarrubia@gmail.com"
              className="underline hover:text-blue-300 transition"
            >
              antoniolozanolarrubia@gmail.com
            </a>
          </p>
          <p>+34 644 95 97 36</p>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          {t('skills_title')}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-300">
          {t.raw('skills').map((item: string, i: number) => (
            <li key={i} className="before:content-['▹'] before:text-blue-500 before:mr-2">
              {item}
            </li>
          ))}
        </ul>
      </div>


      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          {t('additional_title')}
        </h3>
        <ul className="list-disc list-inside text-gray-300">
          {t.raw('additional').map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
