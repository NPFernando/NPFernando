import { AnchorHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost';
};

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  const baseClasses = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition';
  const variants = {
    primary: 'bg-accent text-surface shadow-card hover:translate-y-[-1px]',
    ghost: 'border border-surface-alt text-text hover:border-accent/70 hover:text-accent'
  } as const;

  return <a className={clsx(baseClasses, variants[variant], className)} {...props} />;
}
