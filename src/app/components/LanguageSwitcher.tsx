'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const locales = [
  { code: 'es', flag: '/flags/es.png', alt: 'Español' },
  { code: 'en', flag: '/flags/en.png', alt: 'English' },
  { code: 'ca', flag: '/flags/ca.png', alt: 'Català' }
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    const newPath = pathname.replace(/^\/(en|es|ca)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2 items-center">
      {locales.map(({ code, flag, alt }) => (
        <button
        key={code}
        onClick={() => changeLanguage(code)}
        title={alt}
        className="relative w-6 h-4 overflow-hidden cursor-pointer"
      >
        <Image
          src={flag}
          alt={alt}
          fill
          className="object-contain"
          sizes="24px"
        />
      </button>
      
      ))}
    </div>
  );
}
