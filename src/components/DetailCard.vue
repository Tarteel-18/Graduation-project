<template>
  <!-- الكارد مع دعم الداكن -->
  <div
    class="w-full rounded-[30px]
           bg-white dark:bg-slate-800
           border border-[#E5EDF0] dark:border-slate-700
           shadow-sm overflow-hidden transition-colors duration-300"
  >
    <div class="flex flex-col md:flex-row">
      
      <!-- الصورة -->
      <div class="md:w-1/2 w-full">
        <img
          :src="image"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>

      <!-- النص + الزر -->
      <div class="md:w-1/2 w-full p-6 flex flex-col justify-between gap-4 text-right">

        <!-- النص -->
        <div
          class="text-[15px] leading-relaxed
                 text-slate-700 dark:text-slate-200
                 whitespace-pre-line transition-colors"
        >
          {{ content }}
        </div>

        <!-- الزر -->
        <div class="mt-2 flex justify-end">
          <button
            v-if="buttonText"
            @click="$emit('request')"
            class="px-6 py-2.5 rounded-xl
                   bg-[#165C75] hover:bg-[#124c60]
                   dark:bg-[#0F3F52] dark:hover:bg-[#0b3241]
                   text-white text-sm font-semibold
                   transition-colors"
          >
            {{ buttonText }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: String,
  content: String,
  buttonText: {
    type: String,
    default: '',
  },
})

defineEmits(['request'])
</script>