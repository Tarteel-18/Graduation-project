import Link from 'next/link'
import Image from 'next/image'

interface MediaCardProps {
  title: string
  image: string
  link: string
}

export default function MediaCard({ title, image, link }: MediaCardProps) {
  return (
    <Link
      href={link}
      className="media-card relative rounded-[24px] overflow-hidden group cursor-pointer h-[230px]"
    >
      {/* الصورة */}
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />

      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300"></div>

      {/* النص */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h2 className="text-white text-2xl font-bold tracking-wide">
          {title}
        </h2>
      </div>
    </Link>
  )
}



