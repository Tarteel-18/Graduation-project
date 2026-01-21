import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>›</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#165C75] dark:hover:text-[#7BD4FF]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-cyan-300 font-semibold">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb

