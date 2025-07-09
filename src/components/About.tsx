import { motion } from "framer-motion";
export default function About() {

    return (
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-0">
        <h2 className="text-3xl font-bold mb-6">👨‍💻 Sobre mí</h2>
  
        <p className="text-gray-700 dark:text-gray-300 mb-4">
            Soy Antonio Lozano Larrubia, ingeniero informático graduado por la UAB con especialización en Tecnologías de la Información. 
            Me apasiona el desarrollo web full stack y disfruto creando soluciones funcionales, escalables y centradas en el usuario. 
            También tengo un creciente interés por el área de la ciberseguridad.
            Mi objetivo es seguir creciendo profesionalmente y contribuir a proyectos tecnológicos que marquen la diferencia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="font-semibold mb-1">📅 Fecha de nacimiento</h3>
            <p>29/08/2003</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">🌍 Nacionalidad</h3>
            <p>Española 🇪🇸</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">🎓 Estudios</h3>
            <p>Grado en Ingeniería Informática – UAB</p>
            <p>Bachillerato Tecnológico – Institut Joan Oliver</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">📨 Contacto</h3>
            <p>antoniolozanolarrubia@gmail.com</p>
            <p>+34 644 95 97 36</p>
          </div>
        </div>
  
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">🧠 Competencias personales</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Responsable y comprometido</li>
            <li>Capacidad para aprender rápido y adaptarse</li>
            <li>Trabajo en equipo y colaboración interdisciplinar</li>
            <li>Comprometido con cumplir metas y entregar soluciones efectivas</li>
            <li>Comunicación clara y eficaz</li>
            <li>Pensamiento analítico y resolución de problemas</li>
          </ul>
        </div>
  
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">📌 Información adicional</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Carnet de conducir y vehículo propio</li>
            <li>Disponibilidad completa</li>
          </ul>
        </div>
      </section>
    );
  }
  