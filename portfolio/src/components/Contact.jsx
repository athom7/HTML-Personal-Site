import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'andreasthomsen7@icloud.com',
      href: 'mailto:andreasthomsen7@icloud.com',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: '+45 20 30 10 33',
      href: 'tel:+4520301033',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Copenhagen, Denmark',
      href: null,
      color: 'from-green-500 to-emerald-600'
    }
  ]

  const socialLinks = [
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/andreasthomsen7',
      color: 'hover:text-blue-500'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-slate-800/50 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a conversation
            about digital transformation and process excellence.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className="block bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${info.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <info.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-slate-400 text-sm mb-1">{info.label}</h3>
                    <p className="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">
                      {info.value}
                    </p>
                  </a>
                ) : (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700/50 text-center">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${info.color} mb-4`}>
                      <info.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-slate-400 text-sm mb-1">{info.label}</h3>
                    <p className="text-slate-200 font-medium">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-slate-200 mb-6">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-full border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="text-3xl text-slate-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8 border border-cyan-500/20"
          >
            <h3 className="text-2xl font-bold text-slate-100 mb-3">
              Ready to Transform Your Business Processes?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how my expertise in digital transformation and process excellence
              can contribute to your organization's success.
            </p>
            <a
              href="mailto:andreasthomsen7@icloud.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <HiMail />
              Send Me an Email
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 pt-8 border-t border-slate-700/50 text-center text-slate-400"
        >
          <p>© {new Date().getFullYear()} Andreas Thomsen. Built with React, Tailwind CSS, and Framer Motion.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
