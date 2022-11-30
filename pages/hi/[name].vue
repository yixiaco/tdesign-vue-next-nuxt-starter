<template>
  <div>
    <h1>Hi! {{ $route.params.name }} , counter: {{ counter }}</h1>
    <div>
      <t-button shape="rectangle" variant="text" @click="$router.back()">
        Back
      </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const counter = useCounter();
</script>

<style scoped>

</style>
