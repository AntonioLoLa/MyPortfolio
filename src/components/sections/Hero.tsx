'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site';

type Stat = { value: string; label: string };

export default function Hero() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as Stat[];

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow"
        aria-hidden
      />

      <div className="container-base">
        <div className="flex flex-col items-start">
          <div className="mb-8 flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-border">
              <Image
                src="/personal_photo.jpg"
                alt={t('photoAlt')}
                fill
                sizes="56px"
                className="object-cover [object-position:50%_18%]"
                priority
              />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t('status')}
            </span>
          </div>

          <p className="mb-4 font-mono text-sm text-accent">{t('role')}</p>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {t('headline')}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            {t('summary')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" variant="primary">
              {t('ctaPrimary')}
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="#projects" variant="secondary">
              {t('ctaSecondary')}
              <ArrowUpRight size={16} />
            </ButtonLink>
            <ButtonLink href={siteConfig.cv} variant="ghost" download>
              <Download size={16} />
              {t('ctaResume')}
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} />
            {t('location')}
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-5">
              <dt className="text-2xl font-semibold tracking-tight text-gradient">{stat.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
