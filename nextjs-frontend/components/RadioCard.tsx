interface RadioCardProps {
  title: string
  description: string
  audioUrl?: string
  main?: boolean
}

export default function RadioCard({ title, description, audioUrl, main = false }: RadioCardProps) {
  return (
    <div className="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px] border border-[#D8EDEE] dark:border-slate-700 shadow p-6 hover:shadow-md transition-all duration-300">
      <h3
        className={`text-[#165C75] dark:text-cyan-300 font-bold mb-2 ${
          main ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
        }`}
      >
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-200 mb-4 leading-relaxed">
        {description}
      </p>

      {audioUrl && (
        <audio controls className="w-full mt-3">
          <source src={audioUrl} type="audio/mpeg" />
          المتصفح لا يدعم تشغيل الملفات الصوتية.
        </audio>
      )}
    </div>
  )
}

