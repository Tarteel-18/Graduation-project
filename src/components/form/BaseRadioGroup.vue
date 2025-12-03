<template>
  <div class="space-y-2 w-full">

    <!-- عنوان -->
    <label class="block text-[#165C75] font-semibold text-[15px]">
      {{ label }}
    </label>

    <!-- مجموعة الراديو -->
    <div class="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">

      <label
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="flex items-center gap-3 cursor-pointer"
      >
        <input
          type="radio"
          class="w-4 h-4 accent-[#165C75]"
          :value="opt.value"
          :checked="modelValue === opt.value"
          @change="$emit('update:modelValue', opt.value)"
        />
        <span class="text-slate-700">{{ opt.label }}</span>
      </label>

    </div>

    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  options: Array,
  error: String,
})

const normalizedOptions = props.options.map(o =>
  typeof o === 'string' ? { label: o, value: o } : o
)
</script>
