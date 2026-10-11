import { getFormatter, getTranslations } from 'next-intl/server';
import { projects } from '@/content/projects';
import { month, repo, syncedAt, uncuratedRepos, type Repo } from '@/lib/github';
import RunningHead from '@/components/ui/RunningHead';
import { StatusMark } from '@/components/ui/Evidence';

async function RepoCell({ r }: { r: Repo }) {
  const t = await getTranslations('contents');
  const signals = (['tests', 'ci', 'docker'] as const).filter((k) => r.signals[k]);
  const ciOk = r.ci?.conclusion === 'success';
  return (
    <div className="font-mono text-meta uppercase text-ink-3">
      <a href={r.url} className="link normal-case text-ink" target="_blank" rel="noopener noreferrer">
        {r.name} ↗
      </a>
      <p className="mt-1">
        {[r.language, `${t('pushed')} ${month(r.pushedAt)}`].filter(Boolean).join(' · ')}
      </p>
      {(signals.length > 0 || r.ci) && (
        <p className="mt-0.5">
          {signals.map((k) => `✓ ${t(`signals.${k}`)}`).join('  ')}
          {r.ci && (
            <a href={r.ci.url} className={`link ml-2 ${ciOk ? 'text-positive' : 'text-signal'}`} target="_blank" rel="noopener noreferrer">
              {ciOk ? t('ciPassing') : t('ciFailing')}
            </a>
          )}
        </p>
      )}
    </div>
  );
}

/**
 * Table of contents. Editorial columns come from the manifest; the repository column is
 * the GitHub snapshot, so it updates on every sync without touching this file.
 */
export default async function Contents() {
  const t = await getTranslations('contents');
  const tp = await getTranslations('projects');
  const format = await getFormatter();
  const others = uncuratedRepos();
  const synced = format.dateTime(new Date(syncedAt), { dateStyle: 'long' });

  return (
    <section id="work" aria-labelledby="contents-title" className="page scroll-mt-12">
      <RunningHead kicker={t('kicker')} aside={<span className="normal-case tracking-normal">{t('synced', { date: synced })}</span>} />
      <h2 id="contents-title" className="display mt-6 max-w-[22ch] text-[clamp(1.9rem,3.6vw,3rem)]">
        {t('title')}
      </h2>

      <div className="mt-10">
        <div
          className="hidden border-b border-rule-strong pb-2 font-mono text-meta uppercase text-ink-3 md:grid md:grid-cols-12 md:gap-x-6"
          aria-hidden
        >
          <span className="col-span-1">{t('colNo')}</span>
          <span className="col-span-4">{t('colEntry')}</span>
          <span className="col-span-2">{t('colStatus')}</span>
          <span className="col-span-5">{t('colRepo')}</span>
        </div>
        <ol>
          {projects.map((p) => {
            const r = repo(p.repo);
            return (
              <li
                key={p.slug}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-b border-rule py-5 md:grid-cols-12 md:gap-x-6"
              >
                <span className="display tabular text-2xl text-ink-3 transition-colors group-hover:text-signal md:col-span-1">
                  {p.no}
                </span>
                <div className="md:col-span-4">
                  <a href={`#${p.anchor}`} className="text-lg font-medium leading-snug decoration-signal underline-offset-4 hover:underline">
                    {tp(`${p.slug}.title`)}
                  </a>
                  <p className="mt-1 text-label text-ink-2">
                    {tp(`${p.slug}.kind`)} · <span className="tabular">{p.years}</span>
                  </p>
                </div>
                <div className="col-start-2 md:col-span-2 md:col-start-auto">
                  <StatusMark status={p.status} />
                </div>
                <div className="col-start-2 md:col-span-5 md:col-start-auto">
                  {r ? (
                    <RepoCell r={r} />
                  ) : (
                    <p className="font-mono text-meta uppercase text-ink-3">
                      {p.visibility === 'private' ? t('private') : t('proprietary')}
                      {p.demo && (
                        <>
                          {' · '}
                          <a href={p.demo} className="link normal-case text-ink" target="_blank" rel="noopener noreferrer">
                            {new URL(p.demo).host} ↗
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {others.length > 0 && (
          <div className="mt-8 grid gap-y-2 md:grid-cols-12 md:gap-x-6">
            <p className="meta md:col-span-5 md:col-start-2">
              {t('otherTitle')} — <span className="normal-case tracking-normal">{t('otherNote')}</span>
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-meta md:col-span-6">
              {others.map((r) => (
                <li key={r.name}>
                  <a href={r.url} className="link" target="_blank" rel="noopener noreferrer">
                    {r.name} ↗
                  </a>
                  <span className="ml-2 uppercase text-ink-3">
                    {[r.language, month(r.pushedAt)].filter(Boolean).join(' · ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
