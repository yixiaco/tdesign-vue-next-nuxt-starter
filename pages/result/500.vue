<template>
  <Result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </Result>
</template>
<script lang="ts" setup>
useHead({
  title: '500 Internal Server Error',
  meta: [{ name: 'description', content: '抱歉，服务器出错啦' }],
});
</script>
