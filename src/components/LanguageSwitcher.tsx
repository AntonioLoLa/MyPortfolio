'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'ca', label: 'CA' },
  ];

  return (
    <div className="flex gap-2 ml-4">
      {languages.map(({ code, label }) => (
        <Link
          key={code}
          href={`/${code}${pathname.replace(/^\/[a-z]{2}/, '')}`}
          className={`text-sm hover:underline ${
            code === currentLocale ? 'font-bold' : 'text-gray-500'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
