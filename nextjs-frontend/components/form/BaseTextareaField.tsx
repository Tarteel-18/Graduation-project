'use client'

interface BaseTextareaFieldProps {
  modelValue: string
  label: string
  placeholder?: string
  rows?: number
  hint?: string
  error?: string
  onChange?: (value: string) => void
}

export default function BaseTextareaField({
  modelValue,
  label,
  placeholder = '',
  rows = 3,
  hint = '',
  error = '',
  onChange,
}: BaseTextareaFieldProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 px-8 py-5">
      <label className="block text-sm font-semibold text-[#163B52] dark:text-cyan-300 mb-4">
        {label}
      </label>

      <div className="relative">
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={modelValue}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent outline-none border-0 border-b border-slate-300 dark:border-slate-500 pb-1 text-sm text-slate-800 dark:text-slate-100 resize-none placeholder-slate-400 dark:placeholder-slate-500"
        />

        {hint && !error && (
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            {hint}
          </p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

