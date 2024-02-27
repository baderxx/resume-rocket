<script lang="ts" setup>
type SectionHeaderProps = {
  title: string;
  subTitle: string;
};

withDefaults(defineProps<Partial<SectionHeaderProps>>(), {
  title: "",
  subTitle: "",
});
</script>

<template>
  <div class="grid grid-cols-1">
    <div>
      <p class="mb-2 text-xl">{{ title }}</p>
      <p class="mb-2 text-sm font-thin">{{ subTitle }}</p>
    </div>
  </div>
</template>
