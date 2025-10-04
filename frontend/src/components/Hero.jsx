import React from 'react'
import heroImg from "../assets/blog2.png"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 py-12 md:py-20">
      
      {/* Left Side: Text Content */}
      <div className="flex-1 text-center md:text-left space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight dark:text-white"
        >
          Ideas That <span className="text-purple-600 dark:text-purple-400">Inspire</span>,<br />
          Stories That <span className="text-purple-600 dark:text-purple-400">Connect</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0"
        >
          Dive into thoughtful blogs, fresh perspectives, and voices that matter.
          Join our community of passionate writers and readers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
        >
          <Link to="/signup">
            <Button size="lg" className="px-8 py-3 text-lg w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg w-full sm:w-auto">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side: Hero Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 120 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <img 
          src={heroImg} 
          alt="Person writing blog post illustration" 
          loading="lazy"
          className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] object-contain"
        />
      </motion.div>
    </section>
  )
}

export default Hero
