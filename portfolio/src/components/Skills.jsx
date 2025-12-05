import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiSalesforce,
  SiMicrosoft,
  SiAmazonaws,
  SiPowerbi
} from 'react-icons/si'
import {
  HiChartBar,
  HiUserGroup,
  HiLightningBolt,
  HiGlobe,
  HiCode
} from 'react-icons/hi'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: 'CRM & Platforms',
      skills: [
        { name: 'SAP Cloud for Customer', icon: HiCode, level: 95 },
        { name: 'Salesforce', icon: SiSalesforce, level: 85 },
        { name: 'Microsoft Dynamics', icon: SiMicrosoft, level: 80 },
        { name: 'Showpad Integration', icon: HiLightningBolt, level: 90 }
      ]
    },
    {
      title: 'Analytics & BI',
      skills: [
        { name: 'Power BI', icon: SiPowerbi, level: 90 },
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
        { name: 'AWS Cloud Fundamentals', icon: SiAmazonaws, level: 70 },
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
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="text-cyan-400" />
                          <span className="text-slate-300">{skill.name}</span>
                        </div>
                        <span className="text-slate-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages & Soft Skills */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiGlobe className="text-cyan-400 text-2xl" />
                <h3 className="text-xl font-semibold text-cyan-400">Languages</h3>
              </div>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-slate-400 text-sm">Fluent</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50"
            >
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
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <span className="text-cyan-400">▹</span>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
