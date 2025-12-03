
<template>
  <RouterLink
    :to="link"
    class="bg-[#E9F5F6] border border-[#D8EDEE] rounded-[20px]
           p-5 shadow-sm hover:shadow-md transition-all duration-300
           w-full flex flex-col gap-3 cursor-pointer block"
  >

    <img :src="image" class="w-full h-[140px] object-cover rounded-[14px]" />

    <h3 class="text-[#165C75] font-bold text-lg">
      {{ title }}
    </h3>

    <p class="text-slate-600 leading-7 text-[15px] break-words">
      {{ desc }}
    </p>

  </RouterLink>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  desc: String,
  link: String
})
</script>
