import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiLightningBolt, HiUserGroup, HiChartBar } from 'react-icons/hi'

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="text-cyan-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
