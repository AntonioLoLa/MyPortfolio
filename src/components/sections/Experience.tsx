'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { TechBadge } from '@/components/ui/Badge';

type Item = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as Item[];

  return (
    <Section id="experience" eyebrow={t('eyebrow')} title={t('title')}>
      <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
        {items.map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.08} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent sm:-left-[2.1rem]" />
            <div className="surface rounded-2xl p-6 transition-colors hover:border-accent/40">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">
                  {item.role}{' '}
                  <span className="text-accent">· {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.location} — {item.summary}
              </p>

              <ul className="mt-5 space-y-3">
                {item.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {item.stack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((s) => (
                    <TechBadge key={s}>{s}</TechBadge>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
