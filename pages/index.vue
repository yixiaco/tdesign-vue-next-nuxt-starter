<template>
  <div>
    <div>
      <t-input-number v-model="count" />
    </div>
    <t-input
      v-model="name"
      autocomplete="false"
      class="w-250px display-inline-block p-y-2"
      placeholder="What's your name?"
    />
    <div>
      <t-button
        shape="square"
        variant="outline"
        :disabled="!name"
        @click="() => $router.push(`/hi/${encodeURIComponent(name)}`)"
      >
        Go
      </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { count } = useCounter();
const name = ref('');

definePageMeta({
  title: '首页',
  indexSort: 0,
});
</script>

<style scoped></style>
