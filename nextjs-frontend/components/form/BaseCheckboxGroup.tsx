'use client'

interface Option {
  label: string
  value: string | number
}

interface BaseCheckboxGroupProps {
  modelValue: (string | number)[]
  label: string
  options: (string | Option)[]
  error?: string
  onChange?: (value: (string | number)[]) => void
}

export default function BaseCheckboxGroup({
  modelValue,
  label,
  options,
  error = '',
  onChange,
}: BaseCheckboxGroupProps) {
  const normalizedOptions = options.map((o) =>
    typeof o === 'string' ? { label: o, value: o } : o
  )

  const toggle = (value: string | number) => {
    const arr = [...modelValue]
    if (arr.includes(value)) {
      const newArr = arr.filter((x) => x !== value)
      onChange?.(newArr)
    } else {
      onChange?.([...arr, value])
    }
  }

  return (
    <div className="space-y-2 w-full">
      <label className="block text-[#165C75] dark:text-cyan-300 font-semibold text-[15px]">
        {label}
      </label>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl p-4 space-y-3">
        {normalizedOptions.map((opt) => (
          <div key={opt.value} className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#165C75] cursor-pointer"
              value={String(opt.value)}
              checked={modelValue.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            <span className="text-slate-700 dark:text-slate-100">{opt.label}</span>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

