'use client';

import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Profile from '@/app/components/Profile';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Experience from '@/app/components/Experience';
import Languages from '@/app/components/Languages';
import Contact from '@/app/components/Contact';
import Navbar from '@/app/components/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar on mobile */}
      <div className="lg:hidden px-6 py-4 border-b border-gray-700 bg-neutral-950 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Antonio Lozano</h1>
        <Navbar mobile />
      </div>

      {/* Grid layout on desktop */}
      <div className="grid grid-cols-1 ">
        {/* Sidebar on desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[260px] p-6 border-r border-gray-800 bg-neutral-950">
          <Navbar />
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-8 px-6 py-10 sm:px-20 lg:ml-[260px] scroll-smooth">
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="profile"><Profile /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="experience"><Experience /></section>
          <section id="languages"><Languages /></section>
          <section id="contact"><Contact /></section>
        </div>
      </div>
    </main>
  );
}
