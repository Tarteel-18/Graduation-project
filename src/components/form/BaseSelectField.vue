<template>
  <div class="mb-4">
    <label class="block mb-1 text-sm font-semibold text-right text-slate-700 dark:text-slate-100">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

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

    <p v-if="description" class="mt-1 text-xs text-slate-500 dark:text-slate-400">
      {{ description }}
    </p>

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

// Process options to handle both string arrays and object arrays
const processedOptions = computed(() => {
  if (!props.options || props.options.length === 0) {
    return []
  }
  
  return props.options.map(option => {
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
})

const getOptionKey = (option) => {
  return option.key || option.value || option.label
}

const getOptionValue = (option) => {
  return option.value || option.label
}

const getOptionLabel = (option) => {
  return option.label || option.value
}
</script>
