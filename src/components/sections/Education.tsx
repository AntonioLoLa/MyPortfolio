'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Award, Languages as LanguagesIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

type Degree = { title: string; org: string; period: string; detail: string };
type Cert = { name: string; issuer: string };
type Lang = { name: string; level: string };

export default function Education() {
  const t = useTranslations('education');
  const degrees = t.raw('degrees') as Degree[];
  const certs = t.raw('certifications') as Cert[];
  const langs = t.raw('languages') as Lang[];

  return (
    <Section id="education" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="surface h-full rounded-2xl p-6">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-medium text-accent">
              <GraduationCap size={16} /> {t('degreesTitle')}
            </h3>
            <ol className="space-y-5">
              {degrees.map((d) => (
                <li key={d.title} className="border-l border-border pl-4">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="font-medium">{d.title}</p>
                    <span className="font-mono text-xs text-muted-foreground">{d.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{d.org}</p>
                  {d.detail && <p className="mt-1 text-xs text-muted-foreground">{d.detail}</p>}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.08}>
            <div className="surface rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-accent">
                <Award size={16} /> {t('certsTitle')}
              </h3>
              <ul className="space-y-3">
                {certs.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{c.name}</span>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="surface rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-accent">
                <LanguagesIcon size={16} /> {t('languagesTitle')}
              </h3>
              <ul className="space-y-3">
                {langs.map((l) => (
                  <li key={l.name} className="flex items-center justify-between text-sm">
                    <span>{l.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
