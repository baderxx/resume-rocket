<script lang="ts" setup>
// #TODO: need to fix the transition animation
const isPanelOpen = ref(false);

const onClick = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>
<template>
  <div class="relative mb-3">
    <template v-for="slot in Object.keys($slots)">
      <div v-if="slot === 'activator'" :key="slot">
        <slot name="activator" :click="onClick" :is-open="isPanelOpen"></slot>
      </div>
      <div
        v-if="slot === 'content'"
        :key="slot"
        :class="isPanelOpen ? 'h-100' : 'h-0'"
        class="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <slot name="content"></slot>
      </div>
    </template>
  </div>
</template>
