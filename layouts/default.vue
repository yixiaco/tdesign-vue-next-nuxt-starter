<template>
  <div class="page-index">
    <div class="display-logo">
      <TdesignLogo class="w-65 h-20"/>
      <div class="p-5">
        <t-icon size="25px" name="add"/>
      </div>
      <NuxtLogo />
    </div>
    <slot/>
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </div>
</template>

<script lang="ts" setup>
import TdesignLogo from 'icon/assets-logo-full.svg'
import NuxtLogo from "~/components/NuxtLogo.vue";
import Footer from "~/components/Footer.vue";
</script>

<style scoped>
.display-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
