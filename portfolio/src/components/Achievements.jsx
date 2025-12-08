import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiTrendingUp, HiUsers, HiLightningBolt, HiCheckCircle } from 'react-icons/hi'

const TiltCard = ({ children, index, isInView, delay = 0 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 15
    const y = (e.clientY - rect.top - rect.height / 2) / 15
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.2s ease-out'
      }}
      className="relative group"
    >
      {children}
    </motion.div>
  )
}

const Achievements = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const keyMetrics = [
    {
      icon: HiTrendingUp,
      metric: '#1 in EMEA',
      description: 'Across 9 KPIs',
      color: 'from-blue-700 to-blue-400'
    },
    {
      icon: HiLightningBolt,
      metric: '50%',
      description: 'Performance Improvement in 1 Week',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: HiUsers,
      metric: '95%',
      description: 'CRM Adoption Rate',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: HiCheckCircle,
      metric: '57%',
      description: 'Pipeline Time Reduction',
      color: 'from-orange-500 to-red-600'
    }
  ]

  const achievements = [
    {
      title: 'Cross-Functional Workshop Excellence',
      description: 'Facilitated comprehensive workshop for 24 shop supervisors and regional managers across Denmark, establishing clear process guidelines and regional ambassadors',
      impact: 'Achieved 50% average improvement within one week and positioned Denmark as #1 in EMEA'
    },
    {
      title: 'End-to-End Process Analysis & API Integration',
      description: 'Led complete analysis of lead intelligence tool integration, working across IT and commercial teams to map processes and identify optimization opportunities',
      impact: 'Reduced market response time by 5 days while maintaining 98% data accuracy'
    },
    {
      title: 'Revenue Generation Through Digital Transformation',
      description: 'Implemented comprehensive CRM workflows and middleware integration to consolidate sales data from diverse databases',
      impact: 'Generated several million DKK in incremental revenue and tripled identified sales potential'
    },
    {
      title: 'Strategic C-Suite Engagement',
      description: 'Developed executive dashboards and monthly performance reviews that connect digital process improvements to strategic priorities',
      impact: 'Secured organizational buy-in for process excellence initiatives across all commercial operations'
    }
  ]

  const certifications = [
    'AWS Cloud Practitioner (In Progress - 2025)',
    'Yellow Belt Lean Six Sigma',
    'TACK Presentation Technique',
    'C-suite Management Presentations',
    'Toastmasters Member - Amager Chapter'
  ]

  return (
    <section id="achievements" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Key Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Key Metrics */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            {keyMetrics.map((item, index) => (
              <TiltCard key={index} index={index} isInView={isInView} delay={0.2}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300 text-center">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${item.color} mb-4 transition-transform`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="text-white text-3xl" />
                  </motion.div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                    {item.metric}
                  </div>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Detailed Achievements */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold text-slate-200 mb-8">Major Accomplishments</h3>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300 group"
              >
                <h4 className="text-xl font-semibold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                  {achievement.description}
                </p>
                <div className="flex items-start gap-2 bg-slate-800/50 rounded-lg p-3 border-l-4 border-blue-600">
                  <HiCheckCircle className="text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-slate-200 font-medium">
                    <span className="text-blue-400">Impact:</span> {achievement.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Training */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 border border-slate-700/50"
          >
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Certifications & Continuing Education</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                  className="flex items-center gap-3 text-slate-300 bg-slate-800/50 rounded-lg p-3"
                >
                  <HiCheckCircle className="text-blue-400 text-xl flex-shrink-0" />
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
