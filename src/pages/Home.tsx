import { useMemo } from 'react';
import { Header } from '@components/Header';
import { Section } from '@components/Section';
import { Card } from '@components/Card';
import { ButtonLink } from '@components/ButtonLink';
import skillsRaw from '@content/skills.json';
import projectsRaw from '@content/projects.json';
import learningRaw from '@content/learning.json';
import siteRaw from '@content/site.json';
import { FEATURE_FLAGS, SITE_METADATA } from '@lib/constants';
import {
  LearningTrack,
  Project,
  Skill,
  SiteContent,
  learningTrackSchema,
  projectSchema,
  siteContentSchema,
  skillSchema
} from '@lib/schema';

function validateContent(): SiteContent {
  const skills = skillSchema.array().parse(skillsRaw) as Skill[];
  const projects = projectSchema.array().parse(projectsRaw) as Project[];
  const learning = learningTrackSchema.array().parse(learningRaw) as LearningTrack[];
  return siteContentSchema.parse({ ...siteRaw, skills, projects, learning });
}

export default function Home() {
  const content = useMemo(validateContent, []);

  return (
    <div className="min-h-screen bg-surface text-text">
      <Header />
      <main>
        <Hero content={content} />
        <Section id="about" title="About" eyebrow="Engineering" description="How I design reliable, observable systems.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Summary">
              <p>{content.about.summary}</p>
            </Card>
            <Card title="Philosophy">
              <p>{content.about.philosophy}</p>
            </Card>
            <Card title="Approach">
              <p>{content.about.approach}</p>
            </Card>
          </div>
        </Section>

        <Section id="skills" title="Skills Matrix" eyebrow="Capabilities" description="Capability-led view of where I bring impact.">
          <div className="grid gap-4 lg:grid-cols-2">
            {content.skills.map((capability) => (
              <Card key={capability.capability} title={capability.capability}>
                <ul className="space-y-3">
                  {capability.items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-white/90">{item.name}</span>
                        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs uppercase text-accent">
                          {item.proficiency}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{item.context}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          eyebrow="Architecture"
          description="Architecture-first view of recent work, including trade-offs and operational status."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {content.projects.map((project) => (
              <Card key={project.title} title={project.title} subtitle={project.problem}>
                <p>
                  <span className="font-semibold text-white/90">Architecture:</span> {project.architecture}
                </p>
                <p>
                  <span className="font-semibold text-white/90">Tools:</span> {project.tools.join(', ')}
                </p>
                <p>
                  <span className="font-semibold text-white/90">Trade-offs:</span> {project.tradeoffs}
                </p>
                <p className="text-accent">Current status: {project.status}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="learning"
          title="Learning & Growth"
          eyebrow="Continuous"
          description="Tracks that keep my automation playbooks sharp and future-ready."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {content.learning.map((track) => (
              <Card key={track.track} title={track.track} subtitle={track.timeline}>
                <p className="text-sm text-muted">{track.focus}</p>
                <p className="text-xs uppercase text-accent">{track.status}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="future"
          title="Future-ready capabilities"
          eyebrow="Forward"
          description="How this site is positioned for Azure Static Web Apps, serverless APIs, and identity-aware dashboards."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {content.futureReady.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.description}</p>
              </Card>
            ))}
            <Card title="Azure Functions stub" subtitle="Optional backend readiness">
              <p>
                Feature flag: <span className="text-accent">{String(FEATURE_FLAGS.enableAzureFunctionsStub)}</span> — routes can
                call future Functions endpoints
                without reshaping the UI.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact & Presence"
          eyebrow="Connect"
          description="Cloud-native and automation collaborations welcome."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Where to find me">
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-accent hover:underline" href={content.contacts.github}>
                    GitHub
                  </a>
                </li>
                <li>
                  <a className="text-accent hover:underline" href={content.contacts.linkedin}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <span>Email: {obfuscateEmail(content.contacts.email)}</span>
                </li>
                <li>
                  <a className="text-accent hover:underline" href={content.contacts.resume}>
                    Resume (PDF)
                  </a>
                </li>
              </ul>
            </Card>
            <Card title="Signals of quality">
              <ul className="space-y-2 text-sm text-muted">
                <li>Static-first delivery on Azure Static Web Apps with PR previews.</li>
                <li>Strict TypeScript, linting, and content validation with Zod.</li>
                <li>ARIA-friendly markup and keyboard-optimised navigation.</li>
                <li>Ready to attach serverless APIs or Entra ID when needed.</li>
              </ul>
            </Card>
          </div>
        </Section>
      </main>
      <footer className="border-t border-surface-alt/60 bg-surface-alt/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            Built with Vite, React, Tailwind CSS. Deployed to Azure Static Web Apps.
          </span>
          <span>{SITE_METADATA.title}</span>
        </div>
      </footer>
    </div>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="hero" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-24">
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3 text-sm text-accent">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold">Static-first</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold">Azure-ready</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold">Accessible</span>
        </div>
        <div className="space-y-3">
          <p className="text-lg text-muted">{content.hero.role}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.hero.name}</h1>
          <p className="text-xl text-muted">{content.hero.proposition}</p>
        </div>
        <div className="flex flex-wrap gap-3" aria-label="Focus areas">
          {content.hero.focusAreas.map((area) => (
            <span key={area} className="rounded-full bg-surface-alt px-4 py-2 text-sm text-muted">
              {area}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {content.hero.ctas.map((cta) => (
            <ButtonLink key={cta.label} href={cta.href} variant={cta.variant}>
              {cta.label}
            </ButtonLink>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Cloud-native" subtitle="Azure Static Web Apps">
          <p>Static-first deploys with optional Azure Functions and PR previews for safe iteration.</p>
        </Card>
        <Card title="Performance" subtitle="Vite + Tailwind">
          <p>Lean bundle, lazy sections, and semantic HTML ready for Lighthouse 95+ goals.</p>
        </Card>
        <Card title="Future-proof" subtitle="Typed content">
          <p>JSON + Zod schemas keep content portable and validation-ready for APIs or CMS feeds.</p>
        </Card>
      </div>
    </section>
  );
}

function obfuscateEmail(email: string): string {
  const [user, domain] = email.split('@');
  return `${user.replace(/./g, '*')}@${domain}`;
}
