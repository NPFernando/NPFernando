import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, description, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-12 sm:py-16" aria-labelledby={`${id}-title`}>
      <div className="mb-8 flex flex-col gap-2">
        {eyebrow && <span className="text-sm uppercase tracking-[0.2em] text-accent">{eyebrow}</span>}
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && <p className="max-w-3xl text-base text-muted">{description}</p>}
      </div>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
