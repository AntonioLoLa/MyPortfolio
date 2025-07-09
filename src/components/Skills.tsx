export default function Skills() {
    const lenguajes = [
      "HTML", "CSS", "JavaScript", "PHP", "TypeScript", "Python", "Java", "C++", "Dart", "SQL", "Bash", "Rstudio"
    ];
    const frameworks = [
      "Vue", "Symfony", "Yii2", "Node.js", "Next.js", "Flutter",
    ];
    const herramientas = [
      "Git", "GitHub", "GitLab", "MySql", "PostgreSQL", "Maria DB", "Tailwind CSS", "Figma"
    ];
  
    return (
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-0 mt-12">
        <h2 className="text-3xl font-bold mb-6">🧠 Habilidades Técnicas</h2>
  
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">💻 Lenguajes de Programación</h3>
          <div className="flex flex-wrap gap-2">
            {lenguajes.map((lang, i) => (
              <span
                key={i}
                className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
  
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">⚙️ Frameworks y Librerías</h3>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((fw, i) => (
              <span
                key={i}
                className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-xl font-semibold mb-2">🔧 Herramientas y Bases de Datos</h3>
          <div className="flex flex-wrap gap-2">
            {herramientas.map((tool, i) => (
              <span
                key={i}
                className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-200 text-sm px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }
  