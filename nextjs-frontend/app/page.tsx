'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BaseLayout from '@/components/BaseLayout'

const HEAD = '#185974'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [revealElements, setRevealElements] = useState<Set<Element>>(new Set())
  const sliderTimerRef = useRef<NodeJS.Timeout | null>(null)
  const revealObserverRef = useRef<IntersectionObserver | null>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)

  const sectionTitles = {
    services: 'خدماتنا',
    successStories: 'قصص النجاح',
    projects: 'المشاريع',
    news: 'آخر الأخبار',
  }

  const ctaLabels = {
    servicesMore: 'عرض الكل',
    storiesMore: 'عرض المزيد',
    projectsMore: 'عرض المزيد',
  }

  const govSection = {
    title: 'التسهيلات الحكومية',
    description: 'تعرّف على التسهيلات الحكومية التي تقدمها الهيئة، واحصل على الخدمات بكل سهولة.',
    cta: 'عرض التسهيلات الحكومية',
  }

  const mapSection = {
    title: 'مشاريعنا حسب المحافظات',
    description: 'هنا توضيح خريطة تفاعلية لمواقع المشاريع حسب المحافظات.',
    cta: 'عرض التفاصيل',
  }

  const slides = [
    {
      title: 'مبادرة اليوم .. مستقبل الغد',
      subtitle: 'دعم المشاريع الصغيرة والمتوسطة لتمكين رواد الأعمال في اليمن',
      image: '/assets/images/slaider1.png',
    },
    {
      title: 'تمكين القدرات المحلية لبناء صناعة غذائية مستدامة',
      subtitle: 'التنمية تبدأ بإتقان',
      image: '/assets/images/slaider2.png',
    },
    {
      title: 'نجاحك .. مسؤوليتنا',
      subtitle: 'نرافقك في كل خطوة من رحلتك الريادية',
      image: '/assets/images/slaider3.png',
    },
  ]

  const stats = [
    { number: '+500', label: 'المشاريع المنجزة' },
    { number: '+1200', label: 'رواد الأعمال المستفيدون' },
    { number: '+35', label: 'الشراكات الاستراتيجية' },
  ]

  const services = [
    {
      title: 'التمويل',
      text: 'خدمات تمويل مبتكرة تساعد في نمو مشروعك.',
      routeName: 'service-funding',
      href: '/services/funding',
    },
    {
      title: 'التسويق',
      text: 'دعم تسويقي على المنصات الرقمية وقنوات أخرى.',
      routeName: 'service-marketing',
      href: '/services/marketing',
    },
    {
      title: 'التدريب',
      text: 'برامج تدريبية واستشارات متخصصة لرواد الأعمال.',
      routeName: 'service-training',
      href: '/services/training',
    },
  ]

  const projects = [
    {
      id: 1,
      title: 'مشروع تدريب المدرّبات في خياطة القطنيات بطرق صناعية',
      location: 'صنعاء',
      category: 'القطاع الحرفي',
      status: 'قيد التنفيذ',
      image: '/assets/images/project1.png',
    },
    {
      id: 2,
      title: 'مشروع دعم سلاسل الإمداد الغذائية',
      location: 'عدن',
      category: 'القطاع الغذائي',
      status: 'منجز',
      image: '/assets/images/project1.png',
    },
    {
      id: 3,
      title: 'برنامج تمكين رواد الأعمال الشباب',
      location: 'تعز',
      category: 'برامج تمويل',
      status: 'جارِ الإطلاق',
      image: '/assets/images/project1.png',
    },
  ]

  const mainNews = {
    title: '"الهيئة" قامت بتحديث نظام الدعم الفني',
    summary: 'تم تحديث نظام الدعم الفني لتحسين سرعة الاستجابة وجودة الخدمة المقدمة للمشاريع الصغيرة والمتوسطة عبر مختلف المحافظات.',
    date: '25 يوليو 2025',
    link: '/news/1',
    image: '/assets/logo.png',
  }

  const news = [
    { title: 'افتتاح مبادرة دعم المشاريع الريفية', date: '8 أغسطس 2025', link: '/news/2' },
    { title: 'إطلاق برنامج تمويل جديد للمشاريع الناشئة', date: '1 أغسطس 2025', link: '/news/3' },
    { title: 'ورشة تدريبية لريادة الأعمال النسائية', date: '25 يوليو 2025', link: '/news/4' },
    { title: 'نتائج المبادرات السابقة للمشاريع الصغيرة', date: '15 يوليو 2025', link: '/news/5' },
  ]

  const stories = [
    {
      title: 'قصة أثر',
      name: 'نبذة قصيرة عن قصة أثر',
      image: '/assets/images/STORY.png',
      slug: 'story-1',
    },
    {
      title: 'قصة ملهم ',
      name: 'عبدالرحمن محمد - رائد أعمال',
      image: 'https://via.placeholder.com/600x400?text=قصة+2',
      slug: 'story-2',
    },
    {
      title: 'تجربتي في الريادة',
      name: 'صالح أحمد - مستفيد من المبادرة',
      image: 'https://via.placeholder.com/600x400?text=قصة+3',
      slug: 'story-3',
    },
  ]

  const partners = [
    '/assets/logo.png',
    '/assets/logo2.png',
    '/assets/logo2.png',
    '/assets/logo2.png',
    '/assets/logo2.png',
    '/assets/logo2.png',
    '/assets/logo.png',
    '/assets/logo2.png',
  ]

  const triggerHeroAnimation = () => {
    if (heroTitleRef.current) {
      heroTitleRef.current.classList.remove('hero-animate')
      void heroTitleRef.current.offsetWidth
      heroTitleRef.current.classList.add('hero-animate')
    }
    if (heroSubRef.current) {
      heroSubRef.current.classList.remove('hero-animate-sub')
      void heroSubRef.current.offsetWidth
      heroSubRef.current.classList.add('hero-animate-sub')
    }
  }

  useEffect(() => {
    // Slider auto-advance
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      triggerHeroAnimation()
    }, 5000)

    // Reveal animation observer
    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          } else {
            entry.target.classList.remove('show')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserverRef.current?.observe(el)
    })

    // Partners track animation
    const track = document.querySelector('.partners-track') as HTMLElement
    if (track) {
      track.style.willChange = 'transform'
      track.style.animationTimingFunction = 'linear'
    }

    triggerHeroAnimation()

    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current)
      revealObserverRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    triggerHeroAnimation()
  }, [currentSlide])

  return (
    <BaseLayout>
      <div style={{ paddingTop: '25px' }} id="page-root">
        {/* السلايدر */}
        <section className="relative w-full h-[500px] overflow-hidden mt-0 bg-black">
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt="صورة السلايدر"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* نص السلايدر */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1
                ref={heroTitleRef}
                className="hero-title text-3xl md:text-4xl font-extrabold mb-2"
              >
                {slides[currentSlide].title}
              </h1>
              <p ref={heroSubRef} className="hero-subtitle text-lg opacity-90">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* نقاط */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-[#27AEB9] w-4'
                    : 'bg-white/70 hover:bg-white/90'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* الإحصائيات */}
        <section className="bg-section-alt py-10">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat card-hover reveal">
                  <span className="num" data-final={stat.number}>
                    {stat.number}
                  </span>
                  <span className="lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* خدماتنا */}
        <section className="bg-section pt-5">
          <div className="mx-auto max-w-[1280px] px-6 py-12">
            <h2 className="section-title reveal">{sectionTitles.services}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {services.map((service, i) => (
                <Link
                  key={i}
                  href={service.href}
                  className="card-hover rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden w-[360px] h-[270px] reveal block"
                >
                  <div className="w-full h-[150px] ph"></div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg mb-1" style={{ color: HEAD }}>
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed line-clamp-2">
                      {service.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6 reveal">
              <Link href="/services" className="btn btn-outline">
                {ctaLabels.servicesMore}
              </Link>
            </div>
          </div>
        </section>

        {/* التسهيلات الحكومية */}
        <section className="bg-section-alt py-12">
          <div className="mx-auto max-w-[1280px] px-6 pt-5 text-center reveal">
            <h3 className="section-title section-title-wide mb-2">{govSection.title}</h3>
            <p className="text-slate-600 dark:text-slate-200 mb-4 text-base md:text-lg">
              {govSection.description}
            </p>
            <Link href="/gov-facilities" className="btn btn-solid">
              {govSection.cta}
            </Link>
          </div>
        </section>

        {/* قصص النجاح */}
        <section className="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <h2 className="section-title section-title-wide mb-10 reveal">
              {sectionTitles.successStories}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {stories.map((story, i) => (
                <Link
                  key={story.slug || i}
                  href={`/media/stories/${story.slug}`}
                  className="card-hover group relative w-[360px] h-[230px] rounded-2xl overflow-hidden cursor-pointer reveal block"
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[#165C75]/0 group-hover:bg-[#0F3D52]/80 transition-colors duration-500 z-10"></div>
                  <Image
                    src="/assets/images/pattern.png"
                    alt=""
                    fill
                    className="absolute right-0 top-0 h-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-out pointer-events-none z-20"
                  />
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out px-4">
                    <h3 className="text-lg font-bold mb-1 tracking-wide">{story.title}</h3>
                    <p className="text-sm opacity-90">{story.name}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10 reveal">
              <Link href="/media/stories" className="btn btn-outline text-base">
                {ctaLabels.storiesMore}
              </Link>
            </div>
          </div>
        </section>

        {/* شركاؤنا */}
        <section className="py-12 bg-section-alt">
          <div className="mx-auto max-w-[1280px] px-6 pt-4">
            <h2 className="section-title mb-8 reveal">شركاؤنا</h2>

            <div className="partners-viewport reveal">
              <div className="partners-track">
                {partners.map((logo, i) => (
                  <div key={`p1-${i}`} className="partner-logo-card">
                    <Image src={logo} alt="شعار شريك" width={150} height={96} className="object-contain" loading="lazy" />
                  </div>
                ))}
                {partners.map((logo, i) => (
                  <div key={`p2-${i}`} className="partner-logo-card">
                    <Image src={logo} alt="شعار شريك" width={150} height={96} className="object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* المشاريع */}
        <section className="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <h2 className="section-title reveal">{sectionTitles.projects}</h2>

            <div className="space-y-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="card-hover group relative w-full h-[240px] rounded-3xl overflow-hidden cursor-pointer reveal block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[#165C75]/0 group-hover:bg-[#0F3D52]/80 transition-colors duration-500 z-10"></div>
                  <Image
                    src="/assets/images/pattern.png"
                    alt=""
                    fill
                    className="absolute right-0 top-0 h-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-out pointer-events-none z-20"
                  />
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out px-6">
                    <h3 className="text-xl font-bold mb-2 leading-relaxed">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10 reveal">
              <Link href="/projects" className="btn btn-outline">
                {ctaLabels.projectsMore}
              </Link>
            </div>
          </div>
        </section>

        {/* آخر الأخبار */}
        <section className="py-16 bg-section-alt">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 className="section-title mb-8 reveal">{sectionTitles.news}</h2>

            <div className="grid lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)] gap-8 items-stretch">
              {/* الخبر الرئيسي */}
              <article className="relative rounded-3xl overflow-hidden shadow-md bg-[#111827] text-white reveal flex flex-col justify-end">
                <Image src={mainNews.image} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/5"></div>

                <div className="relative z-10 px-8 pb-8 pt-20 flex flex-col gap-3">
                  <p className="text-xs md:text-sm opacity-90">{mainNews.date}</p>
                  <h3 className="text-xl md:text-2xl font-bold leading-relaxed">{mainNews.title}</h3>
                  <p className="text-xs md:text-sm opacity-90 leading-relaxed line-clamp-3">
                    {mainNews.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/10 transition"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/10 transition"
                      >
                        ›
                      </button>
                      <span className="opacity-80">1 / {news.length + 1}</span>
                    </div>

                    <Link
                      href="/news"
                      className="inline-flex items-center gap-1 font-semibold hover:text-[#27AEB9] transition-colors"
                    >
                      <span>اقرأ الكل</span>
                      <span className="text-lg">⟵</span>
                    </Link>
                  </div>
                </div>
              </article>

              {/* قائمة الأخبار */}
              <aside className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col reveal">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-100">
                    أحدث الأخبار
                  </h3>
                </div>

                <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-700">
                  {news.map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      className="group flex items-start gap-3 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
                    >
                      <span className="absolute right-0 top-0 h-full w-[3px] bg-[#27AEB9] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <div className="flex-1">
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1">
                          {item.date}
                        </p>
                        <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-[#27AEB9] transition-colors">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* الخريطة */}
        <section className="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
          <div className="mx-auto max-w-[1280px] px-6 pb-4 pt-0 text-center reveal">
            <h3 className="section-title section-title-wide">{mapSection.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-3">{mapSection.description}</p>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <iframe
                className="w-full h-[380px]"
                style={{ border: 0 }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=31.0,10.0,55.0,20.5&layer=mapnik&marker=15.5,48.5"
              ></iframe>
            </div>

            <div className="mt-3">
              <Link href="/projects/map" className="btn btn-outline">
                {mapSection.cta}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}
