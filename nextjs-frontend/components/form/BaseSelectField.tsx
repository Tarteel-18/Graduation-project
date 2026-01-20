'use client'

interface Option {
  label?: string | number
  value?: string | number
  key?: string | number
  englishValue?: string
}

interface BaseSelectFieldProps {
  modelValue: string | number
  label: string
  placeholder?: string
  description?: string
  options: (string | Option)[]
  required?: boolean
  error?: string
  onChange?: (value: string | number) => void
}

export default function BaseSelectField({
  modelValue,
  label,
  placeholder = 'اختر من القائمة',
  description = '',
  options = [],
  required = false,
  error = '',
  onChange,
}: BaseSelectFieldProps) {
  const processedOptions = options.map((option) => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
        key: option,
      }
    }
    return {
      label: option.label || option.value || String(option),
      value: option.value || option.label || String(option),
      key: option.key || option.value || option.label || String(option),
      englishValue: option.englishValue,
    }
  })

  const getOptionKey = (option: Option) => {
    return option.key || option.value || option.label || ''
  }

  const getOptionValue = (option: Option) => {
    return option.value || option.label || ''
  }

  const getOptionLabel = (option: Option) => {
    return option.label || option.value || ''
  }

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-semibold text-right text-slate-700 dark:text-slate-100">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <select
        className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-[#06A6C8]"
        value={modelValue}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {processedOptions.map((option) => (
          <option key={getOptionKey(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>

      {description && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

