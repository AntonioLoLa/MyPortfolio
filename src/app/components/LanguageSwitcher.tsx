'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    const newPath = pathname.replace(/^\/(en|es|ca)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('es')}>ES</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ca')}>CA</button>
    </div>
  );
}
