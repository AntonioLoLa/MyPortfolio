import { cn } from '@/lib/utils';

/** The ruled line that opens every section: entry number, kicker, and an optional aside. */
export default function RunningHead({
  no,
  kicker,
  aside,
  className,
}: {
  no?: string;
  kicker: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('running-head meta', className)}>
      {no && <span className="tabular text-signal">{no}</span>}
      <span className="min-w-0 flex-1">{kicker}</span>
      {aside && <span className="hidden sm:inline">{aside}</span>}
    </div>
  );
}
