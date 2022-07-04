<template>
  <transition v-if="!isRefreshing" name="fade" mode="out-in">
    <keep-alive :include="aliveViews">
      <slot />
    </keep-alive>
  </transition>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue';

const aliveViews = computed(() => {
  const tabsRouterStore = useTabsRouterStore();

  return tabsRouterStore.tabRouters.filter((route) => route.isAlive).map((route) => route.name);
}) as ComputedRef<string[]>;

const isRefreshing = computed(() => {
  const tabsRouterStore = useTabsRouterStore();
  const { refreshing } = tabsRouterStore;
  return refreshing;
});
</script>
<style lang="less" scoped>
@import 'style/variables';

.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
