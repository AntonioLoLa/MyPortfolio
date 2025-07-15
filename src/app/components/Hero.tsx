import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 text-center pt-[100px] pb-[50px]">
      <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden">
        <Image
          src="/personal_photo.jpg"
          alt="Foto de Antonio Lozano"
          fill
          sizes="120px"
          className="object-cover [object-position:50%_18%]"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        ¡Hola! Soy <span className="text-blue-600 dark:text-blue-400">Antonio Lozano</span>
      </h1>
      <p className="text-lg max-w-xl text-gray-800 dark:text-gray-300">

        Desarrollador Full Stack con foco en crear experiencias web modernas, funcionales y centradas en el usuario.
      </p>
      <Link
        href="#contact"
        className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-400 dark:to-indigo-500 rounded-full font-medium transition transform hover:scale-105 shadow-md"
      >
        🚀 Contacta conmigo
      </Link>
    </section>
  );
}
