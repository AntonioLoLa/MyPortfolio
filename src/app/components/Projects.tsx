import ProjectCard from "./ProjectCard";

export default function Projects() {
  const proyectos = [
    {
      title: "Planificador de inventario",
      description:
        "Automatiza el flujo de campañas de planificació de soportes DOOH.",
      tech: ["Vue", "Symfony", "Maria DB", "Ouath2", "Open Street Map", "Overpass Turbo"],
      codeLink: "#",
    },
    {
      title: "Juego Pokémon",
      description:
        "Simulación del juego Pokémon con sus funcionalidades principales.",
      tech: ["JavaScript", "Vue", "NodeJS"],
      codeLink: "#", // Pon el enlace real
    },
    {
      title: "Proyecto Flutter",
      description:
        "App de control de acceso a un edificio.",
      tech: ["Flutter", "Java", "Dart"],
      codeLink: "#",
    },
    {
      title: "Mapa de ubicaciones",
      description:
        "Simula ubicaciones y rutas con búsqueda del camino más corto.",
      tech: ["C++"],
      codeLink: "#",
    },
    {
      title: "Web de comercio",
      description:
        "Sitio web de sneakers para operaciones de compra.",
      tech: ["HTML", "CSS", "JS", "PHP"],
      codeLink: "#",
    },
    {
      title: "Programa de cortes",
      description:
        "Calculadora para obras que determina el número de barras a cortar.",
      tech: ["HTML", "CSS", "JavaScript"],
      codeLink: "#",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-0">
      <h2 className="text-3xl font-bold mb-6">🛠️ Proyectos</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {proyectos.map((proj, index) => (
          <ProjectCard key={index} {...proj} />
        ))}
      </div>
    </section>
  );
}
