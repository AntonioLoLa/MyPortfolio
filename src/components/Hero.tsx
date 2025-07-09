import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      <Image
        src="/Foto_personal.JPG"
        alt="Foto de Antonio Lozano"
        width={120}
        height={120}
        className="rounded-full border-2 border-gray-300 dark:border-gray-700 shadow-lg"
      />
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        ¡Hola! Soy <span className="text-blue-600 dark:text-blue-400">Antonio Lozano</span>
      </h1>
      <p className="text-lg max-w-xl text-gray-600 dark:text-gray-300">
        Desarrollador Full Stack enfocado en experiencias web modernas y funcionales.
      </p>
      <Link
        href="#contacto"
        className="mt-4 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full font-medium transition"
      >
        Contacta conmigo
      </Link>
    </section>
  );
}
