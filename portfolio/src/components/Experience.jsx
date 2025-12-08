import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiOfficeBuilding, HiBriefcase } from 'react-icons/hi'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      period: '2021 – Present',
      title: 'Commercial Excellence Specialist',
      company: 'PPG Coatings Denmark A/S',
      location: 'Copenhagen, Denmark',
      responsibilities: [
        'Led workshops for 24 store managers, achieving 50% improvement within one week',
        'Positioned Denmark as #1 in EMEA for nine KPIs within two months',
        'Implemented API solution reducing response times by 5 days',
        'Achieved 95% CRM adoption rate among 100+ users',
        'Reduced pipeline processing time by 57% (from 200 to 85 days)',
        'Generated several million DKK in additional revenue',
        'Present monthly performance reviews to C-suite leadership'
      ],
      icon: HiOfficeBuilding
    },
    {
      period: '2019 – 2021',
      title: 'Customer Success Specialist',
      company: 'Ørsted / SEAS-NVE',
      location: 'Copenhagen, Denmark',
      responsibilities: [
        'Developed comprehensive training materials for digital platform adoption',
        'Initiated advanced analytics practices to enhance customer satisfaction',
        'Improved digital platform adoption rates significantly',
        'Boosted customer satisfaction metrics through data-driven insights'
      ],
      icon: HiBriefcase
    }
  ]

  const education = [
    {
      year: '2016',
      degree: 'Master of Arts',
      field: 'Communication Studies'
    },
    {
      year: '2015',
      degree: 'International Business & Communication',
      field: 'Audencia SciencesCom, Nantes, France'
    },
    {
      year: '2014',
      degree: 'Bachelor of Arts',
      field: 'International Business Communication'
    }
  ]

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl font-semibold text-slate-200 mb-8">Work Experience</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-700 to-blue-400"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative mb-12 md:ml-20"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute -left-[4.5rem] top-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-400 items-center justify-center shadow-lg shadow-blue-600/50">
                  <exp.icon className="text-white text-xl" />
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 md:p-8 border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400 mb-2">{exp.title}</h3>
                      <p className="text-lg text-slate-300 font-medium">{exp.company}</p>
                      <p className="text-slate-400">{exp.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg font-semibold">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-400 mr-2 mt-1">▹</span>
                        <span className="text-slate-300">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-slate-200 mb-8">Education</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300"
              >
                <div className="text-blue-400 font-bold text-lg mb-2">{edu.year}</div>
                <h4 className="text-slate-200 font-semibold mb-1">{edu.degree}</h4>
                <p className="text-slate-400 text-sm">{edu.field}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
