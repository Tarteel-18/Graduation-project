<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/about" class="hover:text-[#165C75] dark:hover:text-cyan-300">عن الهيئة</RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">الشركاء</span>
      </nav>
    </div>

    <!-- Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-4">
      <h1 class="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right">
        شركاؤنا
      </h1>
    </div>

    <!-- Description -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <p class="text-right max-w-[900px] ml-auto text-slate-600 dark:text-slate-300 leading-8 text-[17px]">
        نفخر بشراكاتنا الإستراتيجية مع مؤسسات محلية ودولية بارزة، تسهم معنا في دعم المشاريع 
        الصغيرة والأصغر وتعزيز بيئة ريادة الأعمال. وإن تعاوننا مع شركائنا يفتح آفاقاً واسعة
        للإبتكار، ويوفر فرصاً أكبر للنمو والاستدامة، لنصبح معاً نحو مستقبل أكثر إشراقاً.
      </p>
    </div>

    <!-- White Card Wrapper -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-800 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8 md:p-10 mt-4"
    >
      <!-- Cards grid -->
      <div class="w-full grid md:grid-cols-2 gap-8">
        <RouterLink
          v-for="(item, i) in partners"
          :key="i"
          :to="item.link"
          class="partner-card bg-[#E6F3F5] dark:bg-slate-700
                 rounded-3xl p-8 border border-[#D6E8EB] dark:border-slate-600
                 shadow-sm block"
        >
          <div class="flex items-center gap-3 mb-4">
            <img src="@/assets/images/hand-icon.png" class="w-12 h-12" />
            <h2 class="text-xl font-bold text-[#165C75] dark:text-cyan-300">
              {{ item.title }}
            </h2>
          </div>

          <p class="text-slate-600 dark:text-slate-100 leading-8 text-[17px]">
            {{ item.desc }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const partners = [
  {
    title: "الشركاء المنفذون",
    link: "/partners/executors",
    desc:
      "شركاؤنا المنفذون هم الذراع التنفيذية التي حولت الرؤى إلى واقع ملموس..."
  },
  {
    title: "الشركاء الممولون",
    link: "/partners/funders",
    desc:
      "نعتز بشركائنا الممولين الذين أسهموا في دعم وتمويل البرامج والمشاريع..."
  }
];
</script>

<style scoped>
.partner-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.partner-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 36px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>
