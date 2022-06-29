<template>
  <div>
    <h1>Hi! {{ $route.params.name }} , counter: {{ counter }}</h1>
    <div>
      <t-button shape="square" variant="outline" @click="$router.back()"> Back </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const counter = useCounter();
definePageMeta({
  title: 'hi',
});
</script>

<style scoped></style>
