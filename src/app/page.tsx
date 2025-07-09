import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-32 px-6 py-10 sm:px-20 bg-gradient-to-b from-white to-gray-100 dark:from-[#0e0e0e] dark:to-[#1a1a1a] scroll-smooth">
      <section id="navbar"> <Navbar /> </section>
      <section id="hero"> <Hero /> </section>
      <section id="about"> <About /> </section>
      <section id="skills"> <Skills /> </section>
      <section id="projects"> <Projects /> </section>
      <section id="experience"> <Experience /> </section>
      <section id="languages"> <Languages /> </section>
      <section id="contact"> <Contact /> </section>
    </main>
  );
}
