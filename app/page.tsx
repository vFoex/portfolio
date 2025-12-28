import { client } from '@/sanity/client'
import ProjectsSection from './components/ProjectsSection'
import Navbar from './components/Navbar'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  mainImage?: SanityImageSource
  category?: string
  status?: string
  featured?: boolean
  githubUrl?: string
  liveUrl?: string
  skills?: { _id: string; name: string }[]
  projectType?: 'personal' | 'studies' | 'work'
}

interface Skill {
  _id: string
  name: string
  slug: { current: string }
  icon?: SanityImageSource
  emoji?: string
  iconUrl?: string
  description?: string
  category?: string
  proficiency?: number
  order?: number
  featured?: boolean
}

async function getProjects() {
  const projects = await client.fetch<Project[]>(
    `*[_type == "project" && !(_id in path("drafts.**"))] | order(featured desc, order asc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      category,
      status,
      featured,
      githubUrl,
      liveUrl,
      projectType,
      skills[]->{
        _id,
        name
      }
    }`
  )
  return projects
}

async function getSkills() {
  const skills = await client.fetch<Skill[]>(
    `*[_type == "skill" && !(_id in path("drafts.**"))] | order(order asc, name asc) {
      _id,
      name,
      slug,
      icon,
      emoji,
      iconUrl,
      description,
      category,
      proficiency,
      order,
      featured
    }`
  )
  return skills
}

export default async function Home() {
  const projects = await getProjects()
  const skills = await getSkills()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-x-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <Navbar />

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-7xl mx-auto w-full">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* Main Hero Card - Large */}
              <div className="lg:col-span-8 glass-card p-12 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-gray-300">Available for V.I.E opportunities</span>
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                      Valentin Foex
                    </span>
                  </h1>
                  
                  <p className="text-2xl text-gray-400 mb-6">
                    Full-Stack Software Engineer
                  </p>
                  
                  <p className="text-gray-400 leading-relaxed max-w-2xl mb-8">
                    Building scalable web applications and AI-powered solutions with 3+ years of experience. 
                    Specialized in Angular, Python, React, and Node.js with international research background in Japan.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:valentinfoex@gmail.com" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                      Get in Touch
                    </a>
                    <a href="#projects" className="px-6 py-3 glass-card rounded-xl font-medium hover:bg-white/10 transition-all">
                      View Projects
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="lg:col-span-4 glass-card p-8 rounded-3xl">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">3+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">{projects.length}</div>
                    <div className="text-sm text-gray-400">Featured Projects</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">8+</div>
                    <div className="text-sm text-gray-400">Technologies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Experience Card */}
              <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                <p className="text-sm text-gray-400">3+ years in full-stack development at enterprise level</p>
              </div>

              {/* Education Card */}
              <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-sm text-gray-400">Master&apos;s in Software Engineering & AI Research</p>
              </div>

              {/* Location Card */}
              <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">International</h3>
                <p className="text-sm text-gray-400">Experience in France & Japan, fluent EN/FR</p>
              </div>

              {/* Links Card */}
              <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all">
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex flex-col gap-3">
                  <a href="https://github.com/vFoex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/valentin-foex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </a>
                  <a href="mailto:valentinfoex@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Projects Sections */}
        <ProjectsSection projects={projects} skills={skills} />

        {/* Contact CTA */}
        <section id="contact" className="px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-12 rounded-3xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Contact Me
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Interested in working together? Feel free to reach out for opportunities or collaborations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:valentinfoex@gmail.com"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Send Email
                  </a>
                  <a
                    href="https://linkedin.com/in/valentin-foex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 glass-card rounded-xl font-medium hover:bg-white/10 transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/Resume_Valentin_Foex.pdf"
                    download
                    className="px-8 py-4 glass-card rounded-xl font-medium hover:bg-white/10 transition-all"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Valentin Foex. Built with Next.js & Sanity.
              </p>
              <div className="flex gap-6">
                <a href="https://github.com/vFoex" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/valentin-foex" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  LinkedIn
                </a>
                <a href="mailto:valentinfoex@gmail.com" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
