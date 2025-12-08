import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiLightningBolt, HiUserGroup, HiChartBar } from 'react-icons/hi'

const TiltCard = ({ children, index, isInView }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
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
      className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border transition-all duration-300 group ${
        isHovered ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'border-slate-700/50 hover:border-cyan-500/50'
      }`}
    >
      {children}
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    {
      icon: HiLightningBolt,
      title: 'Business Transformation',
      description: 'I love driving digital transformation — taking complex business challenges and creating elegant solutions through process optimization'
    },
    {
      icon: HiUserGroup,
      title: 'Cross-Functional Leadership',
      description: 'Nothing beats leading change management initiatives — when stakeholders realize technology can enable their success'
    },
    {
      icon: HiChartBar,
      title: 'Data-Driven Results',
      description: 'I\'m motivated by measurable impact — leveraging business intelligence to turn operational improvements into growth'
    }
  ]

  return (
    <section id="about" className="py-20 bg-slate-800/50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12"
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              <span className="text-cyan-400 font-semibold">What motivates me?</span> I'm energized by the challenge
              of being the bridge between business and technology. Over five years leading
              <span className="text-cyan-400 font-semibold"> business transformation</span> and
              <span className="text-cyan-400 font-semibold"> digital operations</span> initiatives,
              I've discovered my passion lies in translating stakeholder needs into actionable solutions —
              turning organizational complexity into streamlined, data-driven processes.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              At <span className="text-cyan-400 font-semibold">PPG Coatings Denmark</span>, I experienced what drives
              me most: watching teams transform. When I facilitated workshops with 24 store managers and we achieved
              <span className="text-cyan-400 font-semibold"> #1 in EMEA across nine KPIs</span>, it wasn't just about
              the numbers — it was about seeing people empowered by better processes and digital tools that actually work.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm drawn to organizations that value <span className="text-cyan-400 font-semibold">operational excellence</span>
              and want to unlock their teams' potential through <span className="text-cyan-400 font-semibold">change management</span>.
              My approach combines <span className="text-cyan-400 font-semibold">business process optimization</span>,
              <span className="text-cyan-400 font-semibold"> cross-functional leadership</span>, and genuine curiosity
              about how people work best — because effective digital transformation isn't just technically sound, it's human-centered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <TiltCard key={index} index={index} isInView={isInView}>
                <motion.div
                  className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-cyan-400 text-2xl" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
