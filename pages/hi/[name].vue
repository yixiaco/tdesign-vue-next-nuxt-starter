<template>
  <h1>Hi! {{ $route.params.name }} , counter: {{ counter }}</h1>
  <div>
    <t-button shape="square" variant="outline" @click="$router.back()">
      Back
    </t-button>
  </div>
</template>

<script lang="ts" setup>
const counter = useCounter();
</script>

<style scoped>

</style>
