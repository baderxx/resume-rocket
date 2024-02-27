<script lang="ts" setup>
const emit = defineEmits(["click"]);
</script>
<template>
  <button class="font-weight-bold text-indigo-500" @click="emit('click')">
    <slot />
  </button>
</template>
