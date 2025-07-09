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
    <div className="border rounded-xl p-6 bg-white dark:bg-[#1b1b1b] shadow-md flex flex-col gap-4">
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
      <div className="flex gap-4 mt-2">
        {codeLink && (
          <Link
            href={codeLink}
            target="_blank"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Código
          </Link>
        )}
        {demoLink && (
          <Link
            href={demoLink}
            target="_blank"
            className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
          >
            Demo
          </Link>
        )}
      </div>
    </div>
  );
}
