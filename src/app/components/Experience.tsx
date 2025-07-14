export default function Experience() {
    const experiencias = [   
      {
        puesto: "Full Stack Developer",
        empresa: "EXTE",
        fecha: "Septiembre 2024 - Actualidad",
        descripcion:
          "Responsable del desarrollo completo de aplicaciones web: implementación de interfaces modernas con React y Next.js, así como construcción de APIs REST con Node.js y gestión de bases de datos en MongoDB. Participación activa en decisiones técnicas y mejora continua del producto.",
      },
      {
        puesto: "Carpintero de aluminio",
        empresa: "MAFAC",
        fecha: "Junio 2019 - Agosto 2023",
        descripcion:
          "Trabajo manual en fabricación y montaje de estructuras de aluminio. Aprendí disciplina, trabajo en equipo, precisión y responsabilidad en entornos reales.",
      },
      // Aquí puedes añadir más en el futuro
    ];
  
    return (
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-0 mt-12">
        <h2 className="text-3xl font-bold mb-6">💼 Experiencia Profesional</h2>
  
        <div className="flex flex-col gap-6">
          {experiencias.map((exp, i) => (
            <div
              key={i}
              className="border-l-4 border-blue-500 pl-4 py-2 bg-white dark:bg-[#1a1a1a] shadow-sm rounded"
            >
              <h3 className="text-xl font-semibold">{exp.puesto}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.empresa}</p>
              <p className="text-sm italic text-gray-500 dark:text-gray-500 mb-2">
                {exp.fecha}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{exp.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  