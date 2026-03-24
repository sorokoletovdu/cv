import { defineCollection, z } from 'astro:content';

const experienceEntrySchema = z.object({
  company: z.string(),
  title: z.string(),
  location: z.string(),
  start: z.string().regex(/^\d{4}-\d{2}$/, 'Must be YYYY-MM (e.g. 2024-12)'),
  end: z.string().regex(/^\d{4}-\d{2}$/, 'Must be YYYY-MM (e.g. 2024-12)').or(z.literal('present')),
  bullets: z.array(z.string()),
});

const educationEntrySchema = z.object({
  degree: z.string(),
  school: z.string(),
  year: z.number().optional(),
});

const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

const resumeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    phone: z.string(),
    email: z.string().email(),
    linkedin: z.string().url(),
    github: z.string().url(),
    permit: z.string(),
    languages: z.array(z.string()),
    summary: z.string().optional(),
    experience: z.array(experienceEntrySchema),
    education: z.array(educationEntrySchema),
    skills: z.array(skillGroupSchema),
  }),
});

export const collections = {
  resume: resumeCollection,
};
