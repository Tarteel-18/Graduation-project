'use client'

import { useState } from 'react'

interface Column {
  key: string
  label: string
  type?: 'text' | 'number' | 'textarea' | 'select'
  options?: (string | { label: string; value: string | number })[]
}

interface Field {
  label: string
  columns: Column[]
}

interface BaseTableFieldProps {
  modelValue: Record<string, any>[]
  field: Field
  onChange?: (value: Record<string, any>[]) => void
}

export default function BaseTableField({
  modelValue,
  field,
  onChange,
}: BaseTableFieldProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [currentRow, setCurrentRow] = useState<Record<string, any>>({})

  const rows = modelValue || []

  const getColumnOptions = (col: Column) => {
    if (!col.options || col.options.length === 0) return []
    return col.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option, key: option }
      }
      return {
        label: option.label || String(option.value),
        value: option.value || option.label,
        key: option.value || option.label,
      }
    })
  }

  const getOptionKey = (option: any) => option.key || option.value || option.label
  const getOptionValue = (option: any) => option.value || option.label
  const getOptionLabel = (option: any) => option.label || option.value

  const resetCurrentRow = () => {
    const newRow: Record<string, any> = {}
    field.columns.forEach((col) => {
      newRow[col.key] = ''
    })
    setCurrentRow(newRow)
  }

  const startAdd = () => {
    setShowAddForm(true)
    setEditingIndex(-1)
    resetCurrentRow()
  }

  const editRow = (index: number) => {
    setShowAddForm(true)
    setEditingIndex(index)
    setCurrentRow({ ...rows[index] })
  }

  const saveRow = () => {
    const newRow = { ...currentRow }
    const updatedRows = [...rows]

    if (editingIndex !== -1) {
      updatedRows[editingIndex] = newRow
    } else {
      updatedRows.push(newRow)
    }

    onChange?.(updatedRows)
    cancelAdd()
  }

  const cancelAdd = () => {
    setShowAddForm(false)
    setEditingIndex(-1)
    resetCurrentRow()
  }

  const removeRow = (index: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الصف؟')) {
      const copy = [...rows]
      copy.splice(index, 1)
      onChange?.(copy)
    }
  }

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-4 py-4">
        <h3 className="font-bold mb-3 text-right text-slate-800 dark:text-slate-100">
          {field.label}
        </h3>

        {!showAddForm && (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-300 text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  {field.columns.map((col) => (
                    <th
                      key={col.key}
                      className="p-2 text-right border-l border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="p-2 text-center border-l border-slate-300 dark:border-slate-600 w-16 text-slate-700 dark:text-slate-200">
                    إجراءات
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={field.columns.length + 1}
                      className="p-4 text-center text-slate-400 dark:text-slate-500"
                    >
                      لا توجد بيانات
                    </td>
                  </tr>
                ) : (
                  rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-t border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {field.columns.map((col) => (
                        <td
                          key={col.key}
                          className="p-2 border-l border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                        >
                          <div className="max-w-xs truncate" title={String(row[col.key] || '-')}>
                            {row[col.key] || '-'}
                          </div>
                        </td>
                      ))}
                      <td className="p-2 text-center border-l border-slate-300 dark:border-slate-600">
                        <div className="flex justify-center gap-1">
                          <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded"
                            onClick={() => editRow(rowIndex)}
                            title="تعديل"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
                            onClick={() => removeRow(rowIndex)}
                            title="حذف"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {showAddForm && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">
              {editingIndex !== -1 ? 'تعديل البيانات' : 'إضافة بيانات جديدة'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field.columns.map((col) => (
                <div key={col.key} className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {col.label}
                  </label>

                  {col.type === 'text' || col.type === 'number' ? (
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      value={currentRow[col.key] || ''}
                      onChange={(e) => setCurrentRow({ ...currentRow, [col.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
                      placeholder={`أدخل ${col.label}`}
                    />
                  ) : col.type === 'textarea' ? (
                    <textarea
                      value={currentRow[col.key] || ''}
                      onChange={(e) => setCurrentRow({ ...currentRow, [col.key]: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent resize-none"
                      placeholder={`أدخل ${col.label}`}
                    />
                  ) : col.type === 'select' ? (
                    <select
                      value={currentRow[col.key] || ''}
                      onChange={(e) => setCurrentRow({ ...currentRow, [col.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
                    >
                      <option value="">اختر {col.label}</option>
                      {getColumnOptions(col).map((option) => (
                        <option key={getOptionKey(option)} value={getOptionValue(option)}>
                          {getOptionLabel(option)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={currentRow[col.key] || ''}
                      onChange={(e) => setCurrentRow({ ...currentRow, [col.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
                      placeholder={`أدخل ${col.label}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={cancelAdd}
              >
                إلغاء
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm bg-[#06A6C8] hover:bg-[#0587A2] text-white rounded-lg transition-colors"
                onClick={saveRow}
              >
                {editingIndex !== -1 ? 'حفظ التعديل' : 'إضافة'}
              </button>
            </div>
          </div>
        )}

        {!showAddForm && (
          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-sm text-[#06A6C8] border border-[#06A6C8] rounded-lg px-4 py-2 hover:bg-[#06A6C8] hover:text-white transition-colors"
            onClick={startAdd}
          >
            <span>➕</span>
            إضافة صف جديد
          </button>
        )}
      </div>
    </div>
  )
}

