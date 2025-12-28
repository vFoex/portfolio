'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          VF
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#skills" className="text-sm hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="text-sm hover:text-cyan-400 transition-colors">Contact</a>
          <a 
            href="/Resume_Valentin_Foex.pdf" 
            download
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center glass-card rounded-lg hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/5 backdrop-blur-md bg-slate-950/50">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a 
              href="#projects" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm hover:text-cyan-400 transition-colors py-2"
            >
              Projects
            </a>
            <a 
              href="#skills" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm hover:text-cyan-400 transition-colors py-2"
            >
              Skills
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm hover:text-cyan-400 transition-colors py-2"
            >
              Contact
            </a>
            <a 
              href="/Resume_Valentin_Foex.pdf" 
              download
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
