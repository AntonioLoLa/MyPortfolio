'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Languages from '@/components/Languages';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-16 px-6 py-10 sm:px-20 scroll-smooth">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="experience"><Experience /></section>
      <section id="languages"><Languages /></section>
      <section id="contact"><Contact /></section>
    </main>
  );
}
