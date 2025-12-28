'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Vérifier si l'icône est un chemin local ou une référence Sanity
function isLocalIcon(icon: any): icon is string {
  return typeof icon === 'string' && icon.startsWith('/')
}

interface Skill {
  _id: string
  name: string
  icon?: SanityImageSource
  emoji?: string
  iconUrl?: string
  description?: string
  category?: string
}

interface SkillDialogProps {
  skill: Skill | null
  onClose: () => void
}

export default function SkillDialog({ skill, onClose }: SkillDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (skill) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [skill, onClose])

  if (!skill) return null

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm min-h-screen flex items-center justify-center p-4"
      onClick={onClose}
      style={{ minHeight: '100dvh' }}
    >
      <div 
        className="glass-card rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1)), rgba(255, 255, 255, 0.05)'
        }}
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card hover:bg-white/10 transition-all flex items-center justify-center z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {skill.icon ? (
              <div className="relative w-24 h-24">
                <Image
                  src={isLocalIcon(skill.icon) ? skill.icon : urlFor(skill.icon).width(192).height(192).url()}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : skill.iconUrl ? (
              <Image
                src={skill.iconUrl}
                alt={skill.name}
                width={96}
                height={96}
                className="object-contain"
                unoptimized
              />
            ) : (
              <div className="text-6xl">
                {skill.emoji || '💡'}
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {skill.name}
            </span>
          </h2>

          {/* Category badge */}
          {skill.category && (
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1 glass-card rounded-full text-xs text-gray-400">
                {skill.category}
              </span>
            </div>
          )}

          {/* Description */}
          <div className="text-gray-300 leading-relaxed text-center">
            {skill.description || "No description available for this skill."}
          </div>
        </div>
      </div>
    </div>
  )
}
