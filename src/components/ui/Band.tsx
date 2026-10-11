import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A full-bleed band of paper. The page alternates between the base stock and a slightly
 * lighter sheet, one band per block, so a fast scroll still shows where each block starts.
 * Bands own the vertical rhythm: sections inside them carry no outer padding of their own,
 * which keeps every tone change in the middle of the white space.
 */
export default function Band({
  tone = 'base',
  children,
  className,
}: {
  tone?: 'base' | 'light';
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(tone === 'light' ? 'sheet-light' : 'bg-paper', 'py-16 sm:py-24', className)}>{children}</div>;
}
