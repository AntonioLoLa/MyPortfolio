import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function TechBadge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-card-muted px-2.5 py-1 font-mono text-xs text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
