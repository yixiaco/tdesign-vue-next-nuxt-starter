<template>
  <div class="login-wrapper">
    <LoginHeader />

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h1 class="title">TDesign Starter</h1>
        <div class="sub-title">
          <p class="tip">{{ type === 'register' ? '已有账号?' : '没有账号吗?' }}</p>
          <p class="tip" @click="switchType(type === 'register' ? 'login' : 'register')">
            {{ type === 'register' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <LoginIndex v-if="type === 'login'" />
      <LoginRegister v-else @register-success="switchType('login')" />
      <LayoutSetting />
    </div>

    <LayoutFooter class="copyright">Copyright @ 2021-2022 Tencent. All Rights Reserved</LayoutFooter>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '登录到 TDesign Starter',
  meta: [{ name: 'description', content: '登录到 TDesign Starter' }],
});
definePageMeta({
  layout: false,
});

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};
</script>

<style lang="less" scoped>
@import 'style/login/index.less';
</style>
