import { getTranslations } from 'next-intl/server';
import type { Status } from '@/content/projects';
import { cn } from '@/lib/utils';

/**
 * The evidence key — the site's recurring device. Status is carried by the glyph's fill
 * (full / half / empty), never by colour alone, so it survives greyscale and colour-blind
 * reading. The label is always present for assistive technology.
 */
export function StatusGlyph({ status, className }: { status: Status; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={cn('inline-block h-[0.7em] w-[0.7em] shrink-0', className)}>
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {status === 'built' && <circle cx="6" cy="6" r="5" fill="currentColor" />}
      {status === 'progress' && <path d="M6 1 A5 5 0 0 1 6 11 Z" fill="currentColor" />}
    </svg>
  );
}

export async function StatusMark({
  status,
  showLabel = true,
  className,
}: {
  status: Status;
  showLabel?: boolean;
  className?: string;
}) {
  const t = await getTranslations('key');
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono text-meta uppercase', className)}>
      <StatusGlyph status={status} />
      <span className={showLabel ? undefined : 'sr-only'}>{t(status)}</span>
    </span>
  );
}

export type Provenance = 'real' | 'synthetic' | 'conceptual' | 'config' | 'illustrative';

/** Where a figure's data comes from. Real data is boxed solid; everything else dashed. */
export async function ProvenanceTag({ kind }: { kind: Provenance }) {
  const t = await getTranslations('key');
  return (
    <span
      className={cn(
        'inline-block whitespace-nowrap border px-1.5 py-px font-mono text-meta uppercase',
        kind === 'real' ? 'border-ink text-ink' : 'border-dashed border-ink-3 text-ink-3',
      )}
    >
      {t(kind)}
    </span>
  );
}

export async function Legend({ className }: { className?: string }) {
  const t = await getTranslations('key');
  const statuses: Status[] = ['built', 'progress', 'planned'];
  const kinds: Provenance[] = ['real', 'config', 'synthetic', 'conceptual'];
  return (
    <aside className={cn('text-label text-ink-2', className)} aria-label={t('legendTitle')}>
      <p className="meta mb-2">{t('legendTitle')}</p>
      <p className="mb-3 max-w-xs">{t('legendText')}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {statuses.map((s) => (
          <li key={s}>
            <StatusMark status={s} />
          </li>
        ))}
      </ul>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {kinds.map((k) => (
          <li key={k}>
            <ProvenanceTag kind={k} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
