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
      title: 'Digital Transformation',
      description: 'Leading CRM implementation and digital adoption initiatives across commercial operations'
    },
    {
      icon: HiUserGroup,
      title: 'Workshop Facilitation',
      description: 'Expert in translating stakeholder needs through structured workshops and cross-functional collaboration'
    },
    {
      icon: HiChartBar,
      title: 'Process Excellence',
      description: 'Proven track record of optimizing business processes to drive measurable KPI improvements'
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
              With over <span className="text-cyan-400 font-semibold">five years of experience</span> as a
              Commercial Excellence Specialist, I translate business needs into digital solutions, bridging
              commercial operations and IT.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              At <span className="text-cyan-400 font-semibold">PPG Coatings Denmark</span>, I led Denmark
              to the top EMEA ranking in nine KPIs through process optimization, targeted workshops, and
              cross-functional collaboration.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My strengths include <span className="text-cyan-400 font-semibold">process mapping</span>,
              <span className="text-cyan-400 font-semibold"> stakeholder enablement</span>, and
              <span className="text-cyan-400 font-semibold"> strategic alignment</span> to drive effective
              digital transformation.
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
