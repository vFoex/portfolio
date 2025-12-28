"use client"

import { useEffect } from "react"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface Project {
  _id: string
  title: string
  description: string
  mainImage?: SanityImageSource
  githubUrl?: string
  liveUrl?: string
  skills?: { _id: string; name: string }[]
  status?: string
  projectType?: string
}

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (project) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md min-h-screen flex items-center justify-center p-4"
      onClick={onClose}
      style={{ minHeight: '100vh', minHeight: '100dvh' }}
    >
      <div
        className="glass-card rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1)), rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card hover:bg-white/10 transition-all flex items-center justify-center z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative">
          {/* Image */}
          <div className="flex justify-center mb-8 mt-8">
            {project.mainImage ? (
              <div className="relative w-full h-64">
                <Image
                  src={urlFor(project.mainImage).width(800).height(500).url()}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center rounded-xl">
                <span className="text-8xl">🚀</span>
              </div>
            )}
          </div>
          {/* Title */}
          <h2 className="text-4xl font-bold text-center mb-4">{project.title}</h2>
          {/* Status & Type */}
          <div className="flex justify-center gap-3 mb-6">
            {project.status && (
              <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md ${
                project.status === "completed"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}>
                {project.status === "in-progress" ? "In Progress" : "Completed"}
              </span>
            )}
            {project.projectType && (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10">
                {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
              </span>
            )}
          </div>
          {/* Description */}
          <p className="text-gray-300 text-center leading-relaxed mb-6 text-lg">
            {project.description}
          </p>
          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {project.skills.map((skill, i) => (
                <span
                  key={`${skill._id}-${i}`}
                  className="text-sm px-4 py-2 bg-white/5 text-gray-300 rounded-full border border-white/10"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
          {/* Links */}
          <div className="flex justify-center gap-4 mt-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-card rounded-xl text-base font-medium hover:bg-white/10 transition-all"
              >
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-card rounded-xl text-base font-medium hover:bg-white/10 transition-all"
              >
                Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
