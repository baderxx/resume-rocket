<script lang='ts' setup>
type SectionHeaderProps = {
    title: string
    subTitle: string
}

withDefaults(defineProps<SectionHeaderProps>(), {
    title: '',
    subTitle: ''
})
</script>

<template>
  <div class="mb-4">
    <v-card-title class="ps-0 pb-0">
      {{ title }}
    </v-card-title>
    <v-card-subtitle class="ps-0 pt-0">
      {{ subTitle }}
    </v-card-subtitle>
  </div>
</template>
