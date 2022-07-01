<template>
  <Result title="系统维护中" tip="系统维护中，请稍后再试" type="maintenance">
    <t-button theme="default" @click="() => $router.push('/')">返回首页</t-button>
  </Result>
</template>

<script lang="ts" setup>
useHead({
  title: '系统维护中',
  meta: [{ name: 'description', content: '系统维护中，请稍后再试' }],
});
</script>
