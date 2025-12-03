<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 px-8 py-5">
    <label class="block text-sm font-semibold text-[#163B52] mb-2">
      {{ label }}
    </label>
    <p v-if="description" class="text-xs text-slate-500 mb-4">
      {{ description }}
    </p>

    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="text-xs text-slate-600 space-y-1">
        <p v-if="!files.length">لم تقم باختيار أي ملف بعد.</p>
        <ul v-else class="list-disc pr-4 space-y-1">
          <li v-for="(file, index) in files" :key="index">
            {{ file.name }}
          </li>
        </ul>
      </div>

      <div>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          :multiple="multiple"
          :accept="accept"
          @change="onChange"
        />
        <button
          type="button"
          @click="trigger"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#06A6C8] text-[#06A6C8] text-sm font-semibold hover:bg-[#E8F8FB] transition-colors"
        >
          <span>{{ buttonLabel }}</span>
          <span class="inline-block rotate-180 text-lg">➤</span>
        </button>
      </div>
    </div>

    <p v-if="error" class="mt-2 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  buttonLabel: {
    type: String,
    default: 'إضافة ملفات'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: '.jpg,.jpeg,.png,.pdf'
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const files = computed(() => props.modelValue)

const trigger = () => {
  if (fileInput.value) fileInput.value.click()
}

const onChange = (e) => {
  const selected = Array.from(e.target.files || [])
  emit('update:modelValue', selected)
}
</script>
