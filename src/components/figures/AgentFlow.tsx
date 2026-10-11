import { getTranslations } from 'next-intl/server';
import type { Status } from '@/content/projects';
import { StatusGlyph } from '@/components/ui/Evidence';
import { cn } from '@/lib/utils';

type NodeId =
  | 'intake'
  | 'classify'
  | 'retrieve'
  | 'diagnose'
  | 'plan'
  | 'policy'
  | 'approve'
  | 'execute'
  | 'verify';

/**
 * Status of each stage, as of the private repository's own status line (Oct 2026).
 * Update here when a milestone lands — the figure and its legend follow.
 */
const flow: { id: NodeId; status: Status; edge?: 'lowConfidence' | 'sensitive' | 'rejected' | 'failed' }[] = [
  { id: 'intake', status: 'progress' },
  { id: 'classify', status: 'built', edge: 'lowConfidence' },
  { id: 'retrieve', status: 'planned' },
  { id: 'diagnose', status: 'planned' },
  { id: 'plan', status: 'planned' },
  { id: 'policy', status: 'planned', edge: 'sensitive' },
  { id: 'approve', status: 'progress', edge: 'rejected' },
  { id: 'execute', status: 'planned' },
  { id: 'verify', status: 'planned', edge: 'failed' },
];

type TraceEvent = { t: string; n: NodeId; m: string };

/**
 * The state machine and a synthetic trace share one grid: each row is a state, and the
 * event it produced sits beside it. On first view the trace steps down the rows.
 */
export default async function AgentFlow() {
  const t = await getTranslations('resolver');
  const tk = await getTranslations('key');
  const trace = t.raw('trace') as TraceEvent[];
  const eventFor = new Map(trace.map((e) => [e.n, e]));

  return (
    <div className="font-mono text-label">
      <div className="mb-2 grid grid-cols-[minmax(0,8.75rem)_1fr] gap-x-4 text-meta uppercase text-ink-3 sm:grid-cols-[13rem_1fr]">
        <span>{t('colState')}</span>
        <span>
          {t('colEvent')} · {t('traceTitle')}
        </span>
      </div>
      <ol className="relative">
        {/* spine */}
        <span aria-hidden className="absolute bottom-6 left-[0.6rem] top-4 w-px bg-ink/60" />
        {flow.map((node, i) => {
          const ev = eventFor.get(node.id);
          return (
            <li
              key={node.id}
              className="trace-step relative grid grid-cols-[minmax(0,8.75rem)_1fr] items-start gap-x-4 py-1.5 sm:grid-cols-[13rem_1fr]"
              style={{ ['--step' as string]: i }}
            >
              <div
                className={cn(
                  'relative z-10 flex items-center gap-2 border bg-paper px-2 py-1.5 text-meta sm:text-label',
                  node.status === 'planned' ? 'border-dashed border-ink-3 text-ink-2' : 'border-ink text-ink',
                )}
              >
                <StatusGlyph status={node.status} className="text-[0.95rem]" />
                <span className="min-w-0 flex-1 leading-tight">{t(`nodes.${node.id}`)}</span>
                <span className="sr-only">({tk(node.status)})</span>
                <span aria-hidden className="trace-dot hidden h-1.5 w-1.5 shrink-0 rounded-full bg-signal-mark sm:block" />
              </div>
              <div className="min-w-0 pt-1 leading-snug">
                {ev && (
                  <p className="text-meta text-ink-2 sm:text-label">
                    <span className="tabular mr-2 text-ink-3">{ev.t}</span>
                    {ev.m}
                  </p>
                )}
                {node.edge && <p className="mt-0.5 text-meta uppercase text-signal">{t(`edges.${node.edge}`)}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:ml-0 sm:max-w-[27rem]">
        <p className="meta col-span-2">{t('outcomes')}</p>
        <div className="trace-step border-2 border-signal-mark px-2 py-1.5 text-ink" style={{ ['--step' as string]: flow.length }}>
          {t('nodes.resolved')}
        </div>
        <div className="flex items-center gap-2 border border-ink px-2 py-1.5 text-ink">
          <StatusGlyph status="built" className="text-[0.95rem]" />
          <span className="min-w-0 leading-tight">{t('nodes.escalate')}</span>
          <span className="sr-only">({tk('built')})</span>
        </div>
      </div>
    </div>
  );
}
