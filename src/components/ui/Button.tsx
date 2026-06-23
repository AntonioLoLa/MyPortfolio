import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:opacity-90 hover:-translate-y-0.5 shadow-sm',
  secondary:
    'surface text-foreground hover:border-accent/60 hover:-translate-y-0.5',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted',
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({ variant = 'primary', className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
