'use client';

import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const t = useTranslations('projects');
  const proyectos: {
    title: string;
    description: string;
    tech: string[];
    codeLink: string;
  }[] = t.raw('items').map((proj: any) => ({
    ...proj,
  }));

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-0">
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {proyectos.map((proj, index) => (
          <ProjectCard key={index} {...proj} />
        ))}
      </div>
    </section>
  );
}
