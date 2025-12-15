<template>
  <div class="space-y-2 w-full">

    <!-- عنوان الحقل -->
    <label class="block text-[#165C75] dark:text-cyan-300 font-semibold text-[15px]">
      {{ label }}
    </label>

    <!-- مجموعة الشيك بوكس -->
    <div
      class="bg-white dark:bg-slate-800
             border border-slate-200 dark:border-slate-600
             rounded-2xl p-4 space-y-3"
    >

      <div
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="flex items-center gap-3"
      >
        <input
          type="checkbox"
          class="w-4 h-4 accent-[#165C75] cursor-pointer"
          :value="opt.value"
          :checked="modelValue.includes(opt.value)"
          @change="toggle(opt.value)"
        />
        <span class="text-slate-700 dark:text-slate-100">{{ opt.label }}</span>
      </div>

    </div>

    <!-- خطأ -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Array,
  label: String,
  options: Array,
  error: String,
})

const emit = defineEmits(['update:modelValue'])

const normalizedOptions = props.options.map(o =>
  typeof o === 'string' ? { label: o, value: o } : o
)

function toggle(v) {
  let arr = [...props.modelValue]

  if (arr.includes(v)) arr = arr.filter(x => x !== v)
  else arr.push(v)

  emit('update:modelValue', arr)
}
</script>
