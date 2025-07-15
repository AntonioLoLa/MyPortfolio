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
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-gray-700 p-4 bg-gray-800 hover:shadow-lg hover:scale-[1.05] transition-all duration-300 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {tech.map((t, i) => (
          <span
            key={i}
            className="bg-blue-700 text-white px-3 py-1 rounded-full"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}

