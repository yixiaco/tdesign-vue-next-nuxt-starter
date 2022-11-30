<template>
  <div>
    <div>
      <t-input-number v-model="counter"/>
    </div>
    <div class="w-250px display-inline-block p-y-2">
      <t-input v-model="name" autocomplete="false" placeholder="What's your name?"/>
    </div>
    <div>
      <t-button shape="square" variant="text" :disabled="!name" @click="()=> $router.push(`/hi/${encodeURIComponent(name)}`)">
        Go
      </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const counter = useCounter();
const name = ref('')
</script>

<style scoped>

</style>
