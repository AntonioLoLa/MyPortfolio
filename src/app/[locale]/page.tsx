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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Mobile navbar */}
      <div className="lg:hidden sticky top-0 z-50 px-4 py-3 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md flex justify-between items-center">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Antonio Lozano
        </h1>
        <Navbar mobile />
      </div>

      {/* Desktop + Mobile layout */}
      <div className="grid grid-cols-1">
        {/* Sidebar on desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-64 px-8 py-10 border-r border-slate-700/30 bg-slate-900/40 backdrop-blur-sm">
          <Navbar />
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-12 px-4 py-8 sm:px-6 md:px-8 lg:ml-64 lg:py-12 lg:px-12 max-w-7xl lg:max-w-6xl">
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
