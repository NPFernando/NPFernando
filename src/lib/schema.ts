import { z } from 'zod';

export const skillSchema = z.object({
  capability: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      proficiency: z.enum(['exploring', 'working', 'advanced', 'expert']),
      context: z.string()
    })
  )
});

export const projectSchema = z.object({
  title: z.string(),
  problem: z.string(),
  architecture: z.string(),
  tools: z.array(z.string()),
  tradeoffs: z.string(),
  status: z.string()
});

export const learningTrackSchema = z.object({
  track: z.string(),
  focus: z.string(),
  status: z.enum(['active', 'planned', 'completed']),
  timeline: z.string()
});

export const siteContentSchema = z.object({
  hero: z.object({
    name: z.string(),
    role: z.string(),
    focusAreas: z.array(z.string()),
    proposition: z.string(),
    ctas: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        variant: z.enum(['primary', 'ghost'])
      })
    )
  }),
  about: z.object({
    summary: z.string(),
    philosophy: z.string(),
    approach: z.string()
  }),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  learning: z.array(learningTrackSchema),
  futureReady: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  contacts: z.object({
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
    resume: z.string()
  })
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type LearningTrack = z.infer<typeof learningTrackSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
