import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  HiChartBar,
  HiUserGroup,
  HiLightningBolt,
  HiGlobe,
  HiCode,
  HiDatabase,
  HiPresentationChartBar,
  HiCloud,
  HiServer
} from 'react-icons/hi'

const SkillCard = ({ category, catIndex, isInView, children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.2s ease-out'
      }}
      className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border transition-all duration-300 ${
        isHovered ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'border-slate-700/50'
      }`}
    >
      {children}
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: 'CRM & Platforms',
      skills: [
        { name: 'SAP Cloud for Customer', icon: HiCode, level: 95 },
        { name: 'Salesforce', icon: HiServer, level: 85 },
        { name: 'Microsoft Dynamics', icon: HiDatabase, level: 80 },
        { name: 'Showpad Integration', icon: HiLightningBolt, level: 90 }
      ]
    },
    {
      title: 'Analytics & BI',
      skills: [
        { name: 'Power BI', icon: HiPresentationChartBar, level: 90 },
        { name: 'Advanced Excel', icon: HiChartBar, level: 95 },
        { name: 'Data Visualization', icon: HiChartBar, level: 85 },
        { name: 'KPI Development', icon: HiChartBar, level: 90 }
      ]
    },
    {
      title: 'Process & Project Management',
      skills: [
        { name: 'Agile Methodologies', icon: HiLightningBolt, level: 85 },
        { name: 'Process Mapping', icon: HiCode, level: 95 },
        { name: 'Change Management', icon: HiUserGroup, level: 90 },
        { name: 'Lean Six Sigma', icon: HiChartBar, level: 80 }
      ]
    },
    {
      title: 'Cloud & Technology',
      skills: [
        { name: 'AWS Cloud Fundamentals', icon: HiCloud, level: 70 },
        { name: 'API Integration', icon: HiCode, level: 85 },
        { name: 'Middleware Solutions', icon: HiLightningBolt, level: 80 }
      ]
    }
  ]

  const languages = [
    { name: 'English', level: 100 },
    { name: 'Danish', level: 100 }
  ]

  const softSkills = [
    'Workshop Facilitation',
    'Stakeholder Management',
    'C-suite Communication',
    'Cross-functional Collaboration',
    'Strategic Thinking',
    'Public Speaking (Toastmasters)'
  ]

  return (
    <section id="skills" className="py-20 bg-slate-800/50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Technical Skills */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skillCategories.map((category, catIndex) => (
              <SkillCard key={catIndex} category={category} catIndex={catIndex} isInView={isInView}>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            <skill.icon className="text-cyan-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                          </motion.div>
                          <span className="text-slate-300">{skill.name}</span>
                        </div>
                        <span className="text-slate-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-shadow duration-300"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: 'linear',
                              repeatDelay: 1
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </SkillCard>
            ))}
          </div>

          {/* Languages & Soft Skills */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <SkillCard category={{ title: 'Languages' }} catIndex={4} isInView={isInView}>
              <div className="flex items-center gap-2 mb-4">
                <HiGlobe className="text-cyan-400 text-2xl" />
                <h3 className="text-xl font-semibold text-cyan-400">Languages</h3>
              </div>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-slate-400 text-sm">Fluent</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-shadow duration-300"
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'linear',
                            repeatDelay: 1
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </SkillCard>

            {/* Soft Skills */}
            <SkillCard category={{ title: 'Professional Skills' }} catIndex={5} isInView={isInView}>
              <div className="flex items-center gap-2 mb-4">
                <HiUserGroup className="text-cyan-400 text-2xl" />
                <h3 className="text-xl font-semibold text-cyan-400">Professional Skills</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-slate-300 cursor-default"
                  >
                    <motion.span
                      className="text-cyan-400"
                      whileHover={{ scale: 1.3, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▹
                    </motion.span>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </SkillCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
