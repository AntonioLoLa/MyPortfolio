'use client';

import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Experience from '@/app/components/Experience';
import Languages from '@/app/components/Languages';
import Contact from '@/app/components/Contact';
import Navbar from '@/app/components/Navbar';

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
