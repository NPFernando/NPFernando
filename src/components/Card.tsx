import { ReactNode } from 'react';
import { clsx } from 'clsx';

type CardProps = {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function Card({ title, subtitle, footer, children }: CardProps) {
  return (
    <article className="rounded-2xl border border-surface-alt/60 bg-surface-alt/60 p-6 shadow-card">
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold tracking-tight text-white/90">{title}</h3>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      <div className={clsx('space-y-2 text-sm text-muted')}>{children}</div>
      {footer && <div className="mt-4 text-sm text-muted">{footer}</div>}
    </article>
  );
}
