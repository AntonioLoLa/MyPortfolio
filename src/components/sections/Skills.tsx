'use client';

import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { TechBadge } from '@/components/ui/Badge';

type Group = { label: string; items: string[] };

export default function Skills() {
  const t = useTranslations('skills');
  const groups = t.raw('groups') as Group[];

  return (
    <Section id="skills" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-accent">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechBadge key={item} className="text-foreground">{item}</TechBadge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
