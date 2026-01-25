<template>
  <div
    class="bg-white dark:bg-slate-800
           rounded-2xl shadow-sm
           border border-slate-100 dark:border-slate-600
           px-6 py-5 mb-4"
  >
    <!-- اللابل -->
    <label class="block text-sm font-semibold text-[#163B52] dark:text-cyan-300 mb-3">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- الـ Select -->
    <select
      class="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm
             bg-white dark:bg-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-[#06A6C8]"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>
        {{ placeholder || 'اختر من القائمة' }}
      </option>

      <option
        v-for="option in processedOptions"
        :key="getOptionKey(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>

    <!-- الوصف -->
    <p v-if="description && !error" class="mt-1 text-xs text-slate-400 dark:text-slate-500">
      {{ description }}
    </p>

    <!-- رسالة الخطأ -->
    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  description: String,
  options: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: String,
})

defineEmits(['update:modelValue'])

// معالجة الخيارات لتدعم المصفوفات من نوع string أو objects
const processedOptions = computed(() => {
  if (!props.options || props.options.length === 0) return []

  return props.options.map(option => {
    if (typeof option === 'string') {
      return { label: option, value: option, key: option }
    }
    return {
      label: option.label || option.value || option,
      value: option.value || option.label || option,
      key: option.key || option.value || option.label || option,
      englishValue: option.englishValue,
    }
  })
})

const getOptionKey = (option) => option.key || option.value || option.label
const getOptionValue = (option) => option.value || option.label
const getOptionLabel = (option) => option.label || option.value
</script>
