<template>
  <Result title="网络异常" tip="网络异常，请稍后再试" type="wifi">
    <div>
      <t-button theme="default" @click="() => $router.push('/')">返回首页</t-button>
      <t-button @click="() => $router.push('/')">重新加载</t-button>
    </div>
  </Result>
</template>

<script lang="ts" setup>
useHead({
  title: '网络异常',
  meta: [{ name: 'description', content: '网络异常，请稍后再试' }],
});
</script>
