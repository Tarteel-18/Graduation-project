import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  image: string
  title: string
  link: string
}

export default function ProjectCard({ image, title, link }: ProjectCardProps) {
  return (
    <Link
      href={link}
      className="project-card group rounded-[24px] overflow-hidden bg-white border border-[#DEDFE1] shadow-sm block"
    >
      {/* صورة المشروع */}
      <div className="relative w-full h-[250px]">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* عتمة فوق الصورة */}
        <div className="absolute inset-0 bg-black/35 transition-all duration-300 group-hover:bg-black/55"></div>

        {/* عنوان المشروع في المنتصف */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <h2 className="text-white text-xl font-bold leading-relaxed">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

