'use client';

import { useTranslations } from 'next-intl';
import { Github, ArrowUpRight, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { TechBadge } from '@/components/ui/Badge';

type Links = { demo?: string; code?: string };
type Featured = {
  name: string;
  tagline: string;
  description: string;
  impact?: string;
  stack: string[];
  year: string;
  links: Links;
};
type More = { name: string; description: string; stack: string[]; links: Links };

function ProjectLinks({ links, codeLabel, demoLabel }: { links: Links; codeLabel: string; demoLabel: string }) {
  return (
    <div className="flex items-center gap-4">
      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github size={15} /> {codeLabel}
        </a>
      )}
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:opacity-80"
        >
          {demoLabel} <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const t = useTranslations('projects');
  const featured = t.raw('featured') as Featured[];
  const more = t.raw('more') as More[];
  const codeLabel = t('viewCode');
  const demoLabel = t('viewDemo');

  return (
    <Section id="projects" eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')}>
      <div className="grid gap-6 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                  <Sparkles size={12} /> {t('featuredLabel')}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-0.5 text-sm text-accent">{p.tagline}</p>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              {p.impact && (
                <p className="mt-4 rounded-lg border border-border bg-card-muted px-3 py-2 text-xs font-medium text-foreground">
                  → {p.impact}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <TechBadge key={s}>{s}</TechBadge>
                ))}
              </div>

              {(p.links.code || p.links.demo) && (
                <div className="mt-5 border-t border-border pt-4">
                  <ProjectLinks links={p.links} codeLabel={codeLabel} demoLabel={demoLabel} />
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mb-5 mt-16 text-sm font-medium text-muted-foreground">{t('moreTitle')}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {more.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <article className="flex h-full flex-col rounded-xl border border-border bg-card-muted p-5 transition-colors hover:border-accent/40">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-medium">{p.name}</h4>
                <ProjectLinks links={p.links} codeLabel={codeLabel} demoLabel={demoLabel} />
              </div>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <TechBadge key={s}>{s}</TechBadge>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
