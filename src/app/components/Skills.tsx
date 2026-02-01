'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Skills() {
  const t = useTranslations('skills');

  const lenguajes: string[] = t.raw('languages');
  const frameworks: string[] = t.raw('frameworks');
  const herramientas: string[] = t.raw('tools');
  const basesDatos: string[] = t.raw('databases');

  const skillCategories = [
    {
      title: t('languages_title'),
      icon: '💻',
      gradient: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238))',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      textColor: '#93c5fd',
      skills: lenguajes,
    },
    {
      title: t('frameworks_title'),
      icon: '⚙️',
      gradient: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      bgColor: 'rgba(168, 85, 247, 0.1)',
      textColor: '#d8b4fe',
      skills: frameworks,
    },
    {
      title: t('tools_title'),
      icon: '🔧',
      gradient: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      textColor: '#86efac',
      skills: herramientas,
    },
    {
      title: t('databases_title'),
      icon: '🗄️',
      gradient: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(239, 68, 68))',
      borderColor: 'rgba(249, 115, 22, 0.3)',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      textColor: '#fed7aa',
      skills: basesDatos,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('title')}
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Skills grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              {/* Glow background */}
              <div 
                className="absolute -inset-0.5 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-500"
                style={{ background: category.gradient }}
              ></div>

              {/* Skill card */}
              <div 
                className="relative rounded-lg p-6 backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 h-full border"
                style={{ 
                  backgroundColor: category.bgColor,
                  borderColor: category.borderColor
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-lg font-bold" style={{ color: category.textColor }}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      variants={itemVariants}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default whitespace-nowrap"
                      style={{ 
                        backgroundColor: category.bgColor,
                        color: category.textColor,
                        borderColor: category.borderColor
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}