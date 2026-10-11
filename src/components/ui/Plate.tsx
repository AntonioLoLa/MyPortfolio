import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { ProvenanceTag, type Provenance } from './Evidence';

type PlateProps = {
  /** Figure number, e.g. "02.1". */
  fig: string;
  title: string;
  caption: ReactNode;
  provenance: Provenance;
  source?: { href: string; label: string };
  children: ReactNode;
  className?: string;
  /** Set when the figure contains marks that animate on first view. */
  animate?: boolean;
  /**
   * Print the artefact as a dark "screen" in the project's own palette (see `.sheet-dark`),
   * like a screenshot reproduced on the page. Header and caption stay on paper.
   */
  screen?: boolean;
};

/** A figure printed on the page: number, provenance, artefact, caption — with crop marks. */
export default async function Plate({
  fig,
  title,
  caption,
  provenance,
  source,
  children,
  className,
  animate,
  screen,
}: PlateProps) {
  const t = await getTranslations('key');
  return (
    <figure className={cn('plate p-4 sm:p-5', className)} data-animate={animate ? '' : undefined}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="meta">
          <span className="text-ink">
            {t('fig')} {fig}
          </span>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="normal-case tracking-normal">{title}</span>
        </p>
        <ProvenanceTag kind={provenance} />
      </div>
      {screen ? <div className="sheet-dark p-3 sm:p-4">{children}</div> : children}
      <figcaption className="mt-4 border-t border-rule pt-3 text-label text-ink-2">
        {caption}
        {source && (
          <>
            {' '}
            <a href={source.href} className="link font-mono text-meta uppercase" target="_blank" rel="noopener noreferrer">
              {t('source')}: {source.label} ↗
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
