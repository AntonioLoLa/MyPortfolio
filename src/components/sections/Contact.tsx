'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, ArrowUpRight, Download } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { siteConfig, cvHref } from '@/lib/site';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-base">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
              aria-hidden
            />
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {t('eyebrow')}
            </p>
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground">{t('description')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
                <Mail size={16} />
                {t('emailCta')}
              </ButtonLink>
              <ButtonLink href={siteConfig.social.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
                {t('linkedin')}
                <ArrowUpRight size={14} />
              </ButtonLink>
              <ButtonLink href={siteConfig.social.github} variant="secondary" target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                {t('github')}
                <ArrowUpRight size={14} />
              </ButtonLink>
              <ButtonLink href={cvHref(locale)} variant="ghost" download>
                <Download size={16} />
                {t('resume')}
              </ButtonLink>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t('availability')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
