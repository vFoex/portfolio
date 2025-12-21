import { client } from '@/sanity/client'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

interface Project {
  title: string
  description: string
  longDescription?: any[]
  mainImage?: any
  gallery?: any[]
  technologies?: string[]
  category?: string
  status?: string
  githubUrl?: string
  liveUrl?: string
  demoVideo?: string
  highlights?: string[]
  startDate?: string
  endDate?: string
}

async function getProject(slug: string) {
  const project = await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      title,
      description,
      longDescription,
      mainImage,
      gallery,
      technologies,
      category,
      status,
      githubUrl,
      liveUrl,
      demoVideo,
      highlights,
      startDate,
      endDate
    }`,
    { slug }
  )
  return project
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-900">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              {project.title}
            </h1>
            {project.status && (
              <span className={`text-sm px-4 py-2 rounded-full ${
                project.status === 'completed' ? 'bg-green-900 text-green-200' :
                project.status === 'in-progress' ? 'bg-blue-900 text-blue-200' :
                'bg-gray-800 text-gray-400'
              }`}>
                {project.status === 'in-progress' ? 'In Progress' : project.status === 'completed' ? 'Completed' : 'Archived'}
              </span>
            )}
          </div>

          <p className="text-xl text-gray-400 mb-8">{project.description}</p>

          <div className="flex gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                View on GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-700 font-medium rounded-lg hover:border-gray-500 transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-4 py-2 bg-gray-900 text-gray-300 rounded-full border border-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Image */}
      {project.mainImage && (
        <section className="container mx-auto px-6 py-8">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-900">
            <Image
              src={urlFor(project.mainImage).width(1600).height(900).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            {project.longDescription && (
              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <PortableText value={project.longDescription} />
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Key Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden bg-gray-900">
                      <Image
                        src={urlFor(image).width(800).height(600).url()}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Project Info</h3>
              
              {project.category && (
                <div className="mb-4">
                  <p className="text-gray-500 text-sm mb-1">Category</p>
                  <p className="text-white">{project.category}</p>
                </div>
              )}

              {(project.startDate || project.endDate) && (
                <div className="mb-4">
                  <p className="text-gray-500 text-sm mb-1">Timeline</p>
                  <p className="text-white">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    {!project.endDate && project.status === 'in-progress' && ' - Present'}
                  </p>
                </div>
              )}

              {project.demoVideo && (
                <div className="mb-4">
                  <a
                    href={project.demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 text-center bg-blue-900 text-blue-200 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Watch Demo Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
