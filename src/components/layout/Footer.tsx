'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const links = [
    { href: siteConfig.social.github, label: 'GitHub', icon: Github },
    { href: siteConfig.social.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${siteConfig.email}`, label: 'Email', icon: Mail },
  ];

  return (
    <footer className="border-t border-border py-10">
      <div className="container-base flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-medium">Antonio Lozano Larrubia</p>
          <p className="text-sm text-muted-foreground">{t('tagline')}</p>
        </div>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="container-base mt-6 flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <span>
          © {year} Antonio Lozano. {t('rights')}
        </span>
        <span>{t('built')}</span>
      </div>
    </footer>
  );
}
