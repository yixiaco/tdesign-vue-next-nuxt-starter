<template>
  <div class="text-xl pt-5 text-gray4 m-5flex justify-center gap-3">
    <NuxtLink class="text-gray4 i-carbon-campsite icon-btn" to="/"/>
    <a class="text-gray4 i-carbon-logo-github icon-btn" href="https://github.com/Tencent/tdesign-vue-next" target="_blank" />
    <a class="icon-btn" :class="[isDark ? 'i-carbon-moon' : 'i-carbon-sun']" @click="useToggleDark()" />
  </div>
</template>
<script lang="ts" setup>
const { isDark, useToggleDark } = useTheme();
</script>
