import Image from 'next/image'

interface DetailCardProps {
  image: string
  content: string
  buttonText?: string
  onRequest?: () => void
}

export default function DetailCard({ image, content, buttonText, onRequest }: DetailCardProps) {
  return (
    <div className="w-full rounded-[30px] bg-white dark:bg-slate-800 border border-[#E5EDF0] dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        {/* الصورة */}
        <div className="md:w-1/2 w-full">
          <Image src={image} alt="" width={600} height={400} className="w-full h-full object-cover" />
        </div>

        {/* النص + الزر */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between gap-4 text-right">
          {/* النص */}
          <div className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line transition-colors">
            {content}
          </div>

          {/* الزر */}
          {buttonText && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={onRequest}
                className="px-6 py-2.5 rounded-xl bg-[#165C75] hover:bg-[#124c60] dark:bg-[#0F3F52] dark:hover:bg-[#0b3241] text-white text-sm font-semibold transition-colors"
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

