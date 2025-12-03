<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/about" class="hover:text-[#165C75]">عن الهيئة</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">الشركاء</span>
      </nav>
    </div>

    <!-- Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-4">
      <h1 class="text-3xl font-bold text-[#165C75] text-right">
        شركاؤنا
      </h1>
    </div>

    <!-- Description -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <p class="text-right max-w-[900px] ml-auto text-slate-600 leading-8 text-[17px]">
        نفخر بشراكاتنا الإستراتيجية مع مؤسسات محلية ودولية بارزة، تسهم معنا في دعم المشاريع 
        الصغيرة والأصغر وتعزيز بيئة ريادة الأعمال.  
        وإن تعاوننا مع شركائنا يفتح آفاقاً واسعة للإبتكار، ويوفر فرصاً أكبر للنمو والاستدامة، 
        لنصبح معاً نحو مستقبل أكثر إشراقاً.
      </p>
    </div>

    <!-- White Card Wrapper (نفس الخدمات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-8 md:p-10 mt-4"
    >

      <!-- Cards grid -->
      <div class="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8">

        <RouterLink
          v-for="(item, i) in partners"
          :key="i"
          :to="item.link"
          class="bg-[#E6F3F5] rounded-3xl p-8 border border-[#D6E8EB]
                 shadow-sm hover:shadow-md transition block"
        >
          <div class="flex items-center gap-3 mb-4">
            <img src="@/assets/images/hand-icon.png" class="w-12 h-12" />
            <h2 class="text-xl font-bold text-[#165C75]">{{ item.title }}</h2>
          </div>

          <p class="text-slate-600 leading-8 text-[17px]">
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
