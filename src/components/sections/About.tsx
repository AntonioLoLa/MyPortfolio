'use client';

import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

type Fact = { label: string; value: string };

export default function About() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const facts = t.raw('facts') as Fact[];

  return (
    <Section id="about" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="text-sm font-medium text-foreground sm:text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
