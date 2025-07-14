import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  codeLink?: string;
  demoLink?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  codeLink,
  demoLink,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-zinc-900 hover:shadow-xl hover:scale-[1.02] transition-all duration-300  flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {tech.map((t, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded"
          >
            #{t}
          </span>
        ))}
      </div>
      
    </div>
  );
}
