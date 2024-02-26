<script lang='ts' setup>
type SectionHeaderProps = {
    title: string
    subTitle: string
    addActionText: string
    isAddActionDisabled?: boolean
}

withDefaults(defineProps<SectionHeaderProps>(), {
    title: '',
    subTitle: '',
    addActionText: '',
    isAddActionDisabled: false
})

const emit = defineEmits(['add'])

const onAddActionClick = () => {
    emit('add')
}
</script>

<template>
    <div class="mb-4">
        section header
        <!-- <v-row>
      <v-col cols="9">
        <v-card-title class="ps-0 pb-0">
          {{ title }}
        </v-card-title>
        <v-card-subtitle class="ps-0 pt-0">
          {{ subTitle }}
        </v-card-subtitle>
      </v-col>
      <v-col class="d-flex align-center">
        <v-btn
          v-if="addActionText"
          :disabled="isAddActionDisabled"
          variant="text"
          @click="onAddActionClick"
        >
          {{ addActionText }}
        </v-btn>
      </v-col>
    </v-row> -->
    </div>
</template>
