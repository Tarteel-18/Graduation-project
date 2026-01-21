'use client'

interface Option {
  label: string
  value: string | number
}

interface BaseRadioGroupProps {
  modelValue: string | number
  label: string
  options: (string | Option)[]
  error?: string
  onChange?: (value: string | number) => void
}

export default function BaseRadioGroup({
  modelValue,
  label,
  options,
  error = '',
  onChange,
}: BaseRadioGroupProps) {
  const normalizedOptions = options.map((o) =>
    typeof o === 'string' ? { label: o, value: o } : o
  )

  return (
    <div className="space-y-2 w-full">
      <label className="block text-[#165C75] dark:text-cyan-300 font-semibold text-[15px]">
        {label}
      </label>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-4 space-y-3">
        {normalizedOptions.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              className="w-4 h-4 accent-[#165C75]"
              value={String(opt.value)}
              checked={modelValue === opt.value}
              onChange={() => onChange?.(opt.value)}
            />
            <span className="text-slate-700 dark:text-slate-100">{opt.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

