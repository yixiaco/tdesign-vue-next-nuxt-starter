<template>
  <Result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </Result>
</template>
<script setup lang="ts">
useHead({
  title: '404 Not Found',
  meta: [{ name: 'description', content: '抱歉，您访问的页面不存在' }],
});
definePageMeta({
  layout: false,
  noAuth: true,
});
</script>
