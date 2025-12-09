<template>
  <RouterLink
    :to="link"
    class="service-card group
           bg-[#E9F5F6] dark:bg-slate-800
           border border-[#D8EDEE] dark:border-slate-700
           rounded-[24px] p-5
           w-full flex flex-col gap-3 cursor-pointer"
  >
    <!-- صورة -->
    <img :src="image" class="w-full h-[140px] object-cover rounded-[16px]" />

    <!-- عنوان -->
    <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mt-1">
      {{ title }}
    </h3>

    <!-- وصف -->
    <p class="text-slate-600 dark:text-slate-300 leading-7 text-[15px] break-words flex-1">
      {{ desc }}
    </p>

    <!-- زر قراءة المزيد -->
    <div class="mt-3">
      <span   class="btn btn-solid w-full mt-4">
        قراءة المزيد
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  desc: String,
  link: String,
})
</script>

<style scoped>
.service-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>
