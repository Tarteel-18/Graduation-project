'use client'

import { useRef } from 'react'

interface BaseFileUploadProps {
  modelValue: File[]
  label: string
  description?: string
  buttonLabel?: string
  multiple?: boolean
  accept?: string
  error?: string
  onChange?: (files: File[]) => void
}

export default function BaseFileUpload({
  modelValue,
  label,
  description = '',
  buttonLabel = 'إضافة ملفات',
  multiple = true,
  accept = '.jpg,.jpeg,.png,.pdf',
  error = '',
  onChange,
}: BaseFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const trigger = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    onChange?.(selected)
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 px-8 py-5">
      <label className="block text-sm font-semibold text-[#163B52] dark:text-cyan-300 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">
          {description}
        </p>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-xs text-slate-600 dark:text-slate-200 space-y-1">
          {modelValue.length === 0 ? (
            <p>لم تقم باختيار أي ملف بعد.</p>
          ) : (
            <ul className="list-disc pr-4 space-y-1">
              {modelValue.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={trigger}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#06A6C8] text-[#06A6C8] text-sm font-semibold hover:bg-[#E8F8FB] dark:hover:bg-slate-700 transition-colors"
          >
            <span>{buttonLabel}</span>
            <span className="inline-block rotate-180 text-lg">➤</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

