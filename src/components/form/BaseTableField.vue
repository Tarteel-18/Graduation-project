<template>
  <div class="mt-8">
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-4 py-4"
    >
      <h3 class="font-bold mb-3 text-right text-slate-800 dark:text-slate-100">
        {{ field.label }}
      </h3>

      <!-- عرض الجدول -->
      <div v-if="!showAddForm" class="overflow-x-auto">
        <table class="w-full border border-slate-300 text-sm border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th
                v-for="col in field.columns"
                :key="col.key"
                class="p-2 text-right border-l border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
              >
                {{ col.label }}
              </th>
              <th class="p-2 text-center border-l border-slate-300 dark:border-slate-600 w-16 text-slate-700 dark:text-slate-200">
                إجراءات
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="rows.length === 0">
              <td
                :colspan="field.columns.length + 1"
                class="p-4 text-center text-slate-400 dark:text-slate-500"
              >
                لا توجد بيانات
              </td>
            </tr>

            <tr
              v-for="(row, rowIndex) in rows"
              :key="rowIndex"
              class="border-t border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <td
                v-for="col in field.columns"
                :key="col.key"
                class="p-2 border-l border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
              >
                <div class="max-w-xs truncate" :title="row[col.key]">
                  {{ row[col.key] || '-' }}
                </div>
              </td>

              <td class="p-2 text-center border-l border-slate-300 dark:border-slate-600">
                <div class="flex justify-center gap-1">
                  <button
                    type="button"
                    class="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded"
                    @click="editRow(rowIndex)"
                    title="تعديل"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
                    @click="removeRow(rowIndex)"
                    title="حذف"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- نموذج إضافة/تعديل صف -->
      <div v-if="showAddForm" class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mt-4">
        <h4 class="font-semibold mb-4 text-slate-700 dark:text-slate-200">
          {{ editingIndex !== -1 ? 'تعديل البيانات' : 'إضافة بيانات جديدة' }}
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="col in field.columns"
            :key="col.key"
            class="space-y-2"
          >
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {{ col.label }}
            </label>
            
            <!-- حقل نص -->
            <input
              v-if="col.type === 'text' || col.type === 'number'"
              v-model="currentRow[col.key]"
              :type="col.type === 'number' ? 'number' : 'text'"
              class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                     bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
              :placeholder="`أدخل ${col.label}`"
            />

            <!-- حقل نص متعدد الأسطر -->
            <textarea
              v-else-if="col.type === 'textarea'"
              v-model="currentRow[col.key]"
              rows="3"
              class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                     bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent resize-none"
              :placeholder="`أدخل ${col.label}`"
            ></textarea>

            <!-- حقل اختيار -->
            <select
              v-else-if="col.type === 'select'"
              v-model="currentRow[col.key]"
              class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                     bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
            >
              <option value="">اختر {{ col.label }}</option>
              <option
                v-for="option in getColumnOptions(col)"
                :key="getOptionKey(option)"
                :value="getOptionValue(option)"
              >
                {{ getOptionLabel(option) }}
              </option>
            </select>

            <!-- حقل افتراضي -->
            <input
              v-else
              v-model="currentRow[col.key]"
              type="text"
              class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                     bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-[#06A6C8] focus:border-transparent"
              :placeholder="`أدخل ${col.label}`"
            />
          </div>
        </div>

        <!-- أزرار النموذج -->
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            class="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 
                   rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            @click="cancelAdd"
          >
            إلغاء
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm bg-[#06A6C8] hover:bg-[#0587A2] text-white rounded-lg transition-colors"
            @click="saveRow"
          >
            {{ editingIndex !== -1 ? 'حفظ التعديل' : 'إضافة' }}
          </button>
        </div>
      </div>

      <!-- زر إضافة صف جديد -->
      <button
        v-if="!showAddForm"
        type="button"
        class="mt-4 flex items-center gap-2 text-sm text-[#06A6C8] border border-[#06A6C8] 
               rounded-lg px-4 py-2 hover:bg-[#06A6C8] hover:text-white transition-colors"
        @click="startAdd"
      >
        <span>➕</span>
        إضافة صف جديد
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  field: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const showAddForm = ref(false)
const editingIndex = ref(-1)
const currentRow = reactive({})

const rows = computed({
  get: () => props.modelValue ?? [],
  set: (val) => emit('update:modelValue', val),
})

// Helper functions for dynamic options
function getColumnOptions(col) {
  if (!col.options || col.options.length === 0) {
    return []
  }
  
  return col.options.map(option => {
    // If option is a string, convert to object
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
        key: option
      }
    }
    
    // If option is already an object, use as is
    return {
      label: option.label || option.value || option,
      value: option.value || option.label || option,
      key: option.key || option.value || option.label || option,
      englishValue: option.englishValue // For backend mapping
    }
  })
}

function getOptionKey(option) {
  return option.key || option.value || option.label
}

function getOptionValue(option) {
  return option.value || option.label
}

function getOptionLabel(option) {
  return option.label || option.value
}

function startAdd() {
  showAddForm.value = true
  editingIndex.value = -1
  resetCurrentRow()
}

function editRow(index) {
  showAddForm.value = true
  editingIndex.value = index
  // نسخ بيانات الصف للتعديل
  Object.assign(currentRow, rows.value[index])
}

function resetCurrentRow() {
  // إعادة تعيين الصف الحالي
  props.field.columns.forEach((col) => {
    currentRow[col.key] = ''
  })
}

function saveRow() {
  const newRow = { ...currentRow }
  
  if (editingIndex.value !== -1) {
    // تعديل صف موجود
    const updatedRows = [...rows.value]
    updatedRows[editingIndex.value] = newRow
    rows.value = updatedRows
  } else {
    // إضافة صف جديد
    rows.value = [...rows.value, newRow]
  }
  
  cancelAdd()
}

function cancelAdd() {
  showAddForm.value = false
  editingIndex.value = -1
  resetCurrentRow()
}

function removeRow(index) {
  if (confirm('هل أنت متأكد من حذف هذا الصف؟')) {
    const copy = [...rows.value]
    copy.splice(index, 1)
    rows.value = copy
  }
}
</script>
