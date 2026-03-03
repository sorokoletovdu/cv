/**
 * Shared TypeScript interfaces for resume data.
 * Single source of truth — used by both web (Astro) and PDF (React-PDF) layers.
 *
 * spec://cv/data#schema
 */

export interface ExperienceEntry {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  year?: number;
}

export interface CertificationEntry {
  name: string;
  status: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  permit: string;
  languages: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications?: CertificationEntry[];
  skills: SkillGroup[];
}
