// src/components/ThemeWrapper.tsx
'use client';

import {ThemeProvider} from 'next-themes';

export function ThemeWrapper({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
