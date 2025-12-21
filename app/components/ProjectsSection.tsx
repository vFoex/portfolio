'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import SkillsSection from './SkillsSection'
import dynamic from 'next/dynamic'
const ProjectDialog = dynamic(() => import('./ProjectDialog'))
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

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
}

interface ProjectsSectionProps {
  projects: Project[]
  skills: Skill[]
}

export default function ProjectsSection({ projects, skills }: ProjectsSectionProps) {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Filtrer les projets
  let filteredProjects = projects

  if (selectedSkillId) {
    filteredProjects = filteredProjects.filter(project => 
      project.skills?.some(skill => skill._id === selectedSkillId)
    )
  }

  if (selectedProjectType) {
    filteredProjects = filteredProjects.filter(project => 
      project.projectType === selectedProjectType
    )
  }

  return (
    <>
      <SkillsSection skills={skills} />

      <section id="projects" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>

            {/* Filtres */}
            <div className="flex flex-wrap gap-4">
              {/* Filter by skill */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-2">Filter by technology</label>
                <select
                  value={selectedSkillId || ''}
                  onChange={(e) => setSelectedSkillId(e.target.value || null)}
                  className="w-full px-4 py-2 glass-card rounded-xl text-sm bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all"
                >
                  <option value="">All technologies</option>
                  {skills.map((skill) => (
                    <option key={skill._id} value={skill._id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by project type */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-2">Filter by type</label>
                <select
                  value={selectedProjectType || ''}
                  onChange={(e) => setSelectedProjectType(e.target.value || null)}
                  className="w-full px-4 py-2 glass-card rounded-xl text-sm bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all"
                >
                  <option value="">All types</option>
                  <option value="personal">Personal</option>
                  <option value="studies">Studies</option>
                  <option value="work">Work</option>
                </select>
              </div>

              {/* Bouton reset si des filtres sont actifs */}
              {(selectedSkillId || selectedProjectType) && (
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedSkillId(null)
                      setSelectedProjectType(null)
                    }}
                    className="px-4 py-2 glass-card rounded-xl text-sm hover:bg-white/10 transition-all"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center">
              <div className="text-6xl mb-6">📦</div>
              <p className="text-gray-400 text-lg mb-6">
                No projects found with these filters
              </p>
              <button
                onClick={() => {
                  setSelectedSkillId(null)
                  setSelectedProjectType(null)
                }}
                className="inline-block px-6 py-3 glass-card rounded-xl font-medium hover:bg-white/10 transition-all"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <button
                  key={project._id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group glass-card rounded-3xl overflow-hidden hover:bg-white/5 transition-all text-left"
                  title={project.title}
                >
                  {project.mainImage ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(project.mainImage).width(800).height(600).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                      {project.status && (
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                          project.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                      <span className="text-6xl">🚀</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                      {project.description}
                    </p>
                    {project.skills && project.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill._id}
                            className="text-xs px-3 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10">
                            +{project.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
    )
  }
