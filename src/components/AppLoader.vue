<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center
           bg-white dark:bg-slate-950 text-center px-4 overflow-hidden"
  >
    <!-- النص فقط بدون دائرة -->
    <p class="loader-text">
      معاً نحن أكبر
    </p>
  </div>
</template>

<style scoped>
.loader-text {
  font-size: 2rem;
  font-weight: 800;
  animation:
    float 1.8s ease-in-out infinite,
    shimmer 2.4s linear infinite;
  background: linear-gradient(90deg, #165C75, #27AEB9, #165C75);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

/* حركـة النص */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@keyframes shimmer {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
</style>
