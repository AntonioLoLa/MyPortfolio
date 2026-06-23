import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Reveal from './Reveal';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <div className="container-base">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-pretty text-muted-foreground">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
