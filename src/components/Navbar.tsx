"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Idiomas", href: "#languages" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-black/60 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Antonio Lozano</h1>

        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-sm bg-transparent border-none text-inherit hover:underline cursor-pointer ml-4"
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          )}
        </div>
        
      </div>
    </nav>
  );
}
