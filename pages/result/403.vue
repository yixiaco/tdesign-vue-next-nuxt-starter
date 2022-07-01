<template>
  <Result title="403 Forbidden" tip="抱歉，您无权限访问此页面，企业微信联系创建者xiaolaoshi">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </Result>
</template>
<script lang="ts" setup>
useHead({
  title: '403 Forbidden',
  meta: [{ name: 'description', content: '抱歉，您无权限访问此页面，企业微信联系创建者xiaolaoshi' }],
});
</script>
