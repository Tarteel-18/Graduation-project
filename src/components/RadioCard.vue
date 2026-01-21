<template>
  <div
    class="bg-[#ECF6F7] rounded-[26px] border border-[#D8EDEE] shadow p-6
           hover:shadow-md transition-all duration-300"
  >
    <h3
      :class="[
        'text-[#165C75] font-bold mb-2',
        main ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
      ]"
    >
      {{ title }}
    </h3>

    <p class="text-slate-600 mb-4 leading-relaxed">
      {{ description }}
    </p>

    <audio v-if="audioUrl" controls class="w-full mt-3">
      <source :src="audioUrl" type="audio/mpeg" />
      المتصفح لا يدعم تشغيل الملفات الصوتية.
    </audio>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  audioUrl: String,
  main: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
