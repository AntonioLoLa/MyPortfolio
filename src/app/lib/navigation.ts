export const locales = ['es', 'en', 'ca'] as const;
export type Locale = (typeof locales)[number];

export const routeLabels: Record<Locale, Record<string, string>> = {
  es: {
    hero: "Inicio",
    about: "Sobre mí",
    skills: "Skills",
    projects: "Proyectos",
    experience: "Experiencia",
    languages: "Idiomas",
    contact: "Contacto",
  },
  en: {
    hero: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    languages: "Languages",
    contact: "Contact",
  },
  ca: {
    hero: "Inici",
    about: "Sobre mi",
    skills: "Habilitats",
    projects: "Projectes",
    experience: "Experiència",
    languages: "Idiomes",
    contact: "Contacte",
  },
};
