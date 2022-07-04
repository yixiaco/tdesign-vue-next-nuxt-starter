<template>
  <NuxtLayout>
    <NuxtPage :class="[mode]" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import config from '~/config/style';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

onMounted(() => {
  store.updateConfig({ ...config });
});
</script>
<style lang="less" scoped>
@import 'style/variables.less';

#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
