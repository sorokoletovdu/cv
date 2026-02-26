import { defineCollection, z } from 'astro:content';

const experienceEntrySchema = z.object({
  company: z.string(),
  title: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  bullets: z.array(z.string()),
});

const educationEntrySchema = z.object({
  degree: z.string(),
  school: z.string(),
  location: z.string(),
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
    experience: z.array(experienceEntrySchema),
    education: z.array(educationEntrySchema),
    skills: z.array(skillGroupSchema),
  }),
});

const achievementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    technologies: z.array(z.string()),
  }),
});

export const collections = {
  resume: resumeCollection,
  achievements: achievementsCollection,
};
