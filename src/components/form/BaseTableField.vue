<template>
  <div class="mt-8">
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-4 py-4"
    >
      <h3 class="font-bold mb-3 text-right text-slate-800 dark:text-slate-100">
        {{ field.label }}
      </h3>

      <table class="w-full border border-slate-300 text-sm border-collapse">
        <thead>
          <tr class="bg-slate-100">
            <th
              v-for="col in field.columns"
              :key="col.key"
              class="p-2 text-right border-l border-slate-300"
            >
              {{ col.label }}
            </th>
            <th class="p-2 text-center border-l border-slate-300 w-16">
              حذف
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="rows.length === 0">
            <td
              :colspan="field.columns.length + 1"
              class="p-4 text-center text-slate-400"
            >
              لا توجد بيانات
            </td>
          </tr>

          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="border-t border-slate-300"
          >
            <td
              v-for="col in field.columns"
              :key="col.key"
              class="p-2 border-l border-slate-300"
            >
              <input
                v-if="col.type === 'text'"
                v-model="rows[rowIndex][col.key]"
                type="text"
                class="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-right"
              />

              <textarea
                v-else-if="col.type === 'textarea'"
                v-model="rows[rowIndex][col.key]"
                rows="2"
                class="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-right resize-none"
              ></textarea>
            </td>

            <td class="p-2 text-center border-l border-slate-300">
              <button
                type="button"
                class="text-red-500 text-xs"
                @click="removeRow(rowIndex)"
              >
                ✕
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        class="mt-3 text-sm text-[#165C75] border border-[#165C75] rounded-full px-4 py-1 hover:bg-[#165C75] hover:text-white"
        @click="addRow"
      >
        Add Row
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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

const rows = computed({
  get: () => props.modelValue ?? [],
  set: (val) => emit('update:modelValue', val),
})

function addRow() {
  const emptyRow = {}
  props.field.columns.forEach((col) => {
    emptyRow[col.key] = ''
  })
  rows.value = [...rows.value, emptyRow]
}

function removeRow(index) {
  const copy = [...rows.value]
  copy.splice(index, 1)
  rows.value = copy
}
</script>
