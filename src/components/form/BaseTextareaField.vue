<template>
  <div
    class="bg-white dark:bg-slate-800
           rounded-2xl shadow-sm
           border border-slate-100 dark:border-slate-600
           px-8 py-5"
  >
    <label class="block text-sm font-semibold text-[#163B52] dark:text-cyan-300 mb-4">
      {{ label }}
    </label>

    <div class="relative">
      <textarea
        :rows="rows"
        :placeholder="placeholder"
        v-model="model"
        class="w-full bg-transparent outline-none border-0
               border-b border-slate-300 dark:border-slate-500
               pb-1 text-sm text-slate-800 dark:text-slate-100
               resize-none placeholder-slate-400 dark:placeholder-slate-500"
      ></textarea>

      <p v-if="hint && !error" class="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
        {{ hint }}
      </p>
      <p v-if="error" class="mt-1 text-xs text-red-500">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  },
  hint: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
