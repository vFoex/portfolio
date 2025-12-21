'use client'

import { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import SkillDialog from './SkillDialog'

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
  slug: { current: string }
  icon?: SanityImageSource
  emoji?: string
  iconUrl?: string
  description?: string
  category?: string
  proficiency?: number
  featured?: boolean
}

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  
  // Afficher 8 skills featured au début, puis tous les skills si showAll
  const featuredSkills = skills.filter(skill => skill.featured)
  const displayedSkills = showAll ? skills : featuredSkills.slice(0, 8)

  return (
    <section id="skills" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          {skills.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showAll ? 'Show less' : `View all (${skills.length})`} →
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {displayedSkills.map((skill) => (
            <button
              key={skill._id}
              onClick={() => setSelectedSkill(skill)}
              className="glass-card p-4 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer relative"
              title={skill.description || skill.name}
            >
              {skill.icon ? (
                <div className="relative w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Image
                    src={isLocalIcon(skill.icon) ? skill.icon : urlFor(skill.icon).width(96).height(96).url()}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : skill.iconUrl ? (
                <div className="relative w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Image
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {skill.emoji || '💡'}
                </div>
              )}
              <div className="text-sm font-medium text-gray-300">{skill.name}</div>
            </button>
          ))}
        </div>
      </div>

      <SkillDialog skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  )
}
