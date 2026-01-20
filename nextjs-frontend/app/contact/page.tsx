import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'

export default function Contact() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'تواصل معنا' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            تواصل معنا
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            نحن هنا لدعمك والإجابة على استفساراتك حول المشاريع الصغيرة والأصغر.
            يسعدنا التواصل معك في حال كان لديك سؤال أو اقتراح.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* اتصل بنا */}
            <div className="box hover-card">
              <div className="icon-box ml-auto">
                <Image src="/assets/images/icon1.png" alt="" width={28} height={28} className="icon" />
              </div>
              <h3 className="title">اتصل بنا</h3>
              <p className="text">
                780040072 :رقم العلاقات العامة <br />
                780040073 :رقم الإعلام <br />
                783888781 :نافذة المقترحات
              </p>
            </div>

            {/* نموذج تواصل */}
            <div className="box hover-card flex flex-col justify-between">
              <div className="flex flex-col text-right">
                <div className="icon-box ml-auto">
                  <Image src="/assets/images/icon4.png" alt="" width={28} height={28} className="icon" />
                </div>
                <h3 className="title">نموذج تواصل</h3>
                <p className="text">
                  السبت – الأربعاء<br />
                  8:00 صباحًا – 1:00 مساءً
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  href="/form/contact-form"
                  className="arrow-btn"
                  aria-label="فتح نموذج التواصل"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16 12H5M10 7l-5 5 5 5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* العنوان */}
            <div className="box hover-card">
              <div className="icon-box ml-auto">
                <Image src="/assets/images/icon5.png" alt="" width={28} height={28} className="icon" />
              </div>
              <h3 className="title">العنوان</h3>
              <p className="text">
                صنعاء – الدائري – جولة غزة (كنتاكي سابقاً) <br />
                عمارة المعتلي
              </p>
            </div>

            {/* السوشال */}
            <div className="box hover-card">
              <div className="icon-box ml-auto">
                <Image src="/assets/images/icon2.png" alt="" width={28} height={28} className="icon" />
              </div>
              <h3 className="title">وسائل التواصل الاجتماعي</h3>
              <p className="text mb-3">حساباتنا الرسمية على مواقع التواصل</p>
              <div className="flex gap-3 justify-end">
                <a
                  href="https://www.facebook.com/share/1Lk2sKUtik/"
                  target="_blank"
                  rel="noopener"
                  className="soc"
                  aria-label="Facebook"
                >
                  <Image src="/assets/icons/facebook.png" alt="Facebook" width={24} height={24} />
                </a>
                <a
                  href="https://t.me/samea777"
                  target="_blank"
                  rel="noopener"
                  className="soc"
                  aria-label="Telegram"
                >
                  <Image src="/assets/icons/telegram.png" alt="Telegram" width={24} height={24} />
                </a>
                <a
                  href="https://wa.me/967780040073"
                  target="_blank"
                  rel="noopener"
                  className="soc"
                  aria-label="WhatsApp"
                >
                  <Image src="/assets/icons/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                </a>
                <a
                  href="https://x.com/Gasmed28Gasmed?t=MTnUmxS6FGUDzKghkLtP9A&s=09"
                  target="_blank"
                  rel="noopener"
                  className="soc"
                  aria-label="X"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M4 3h4l4 5 4-5h4l-7 8 7 10h-4l-5-7-5 7H4l7-10z" fill="#000000" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/channel/UCL-scONsm7whLMk2rc1aCaA?si=AJ-dMnJlO-RLQKGQ"
                  target="_blank"
                  rel="noopener"
                  className="soc"
                  aria-label="YouTube"
                >
                  <Image src="/assets/icons/youtube.png" alt="YouTube" width={24} height={24} />
                </a>
              </div>
            </div>

            {/* البريد */}
            <div className="box hover-card">
              <div className="icon-box ml-auto">
                <Image src="/assets/images/icon3.png" alt="" width={28} height={28} className="icon" />
              </div>
              <h3 className="title">البريد الإلكتروني</h3>
              <p className="text">info@gasmed.gov.ye</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

