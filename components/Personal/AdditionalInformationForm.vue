<script setup lang="ts">
const panel: Ref<number[]> = ref([])
</script>
<template>
  <v-expansion-panels
    v-model="panel"
  >
    <v-expansion-panel
      :static="true"
      color="primary"
    >
      <v-expansion-panel-title>
        <span class="font-weight-bold text-primary">Additional Information</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Address"
              variant="filled"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Postal code"
              variant="filled"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Driving license"
              variant="filled"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Nationality"
              variant="filled"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Place of birth"
              variant="filled"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Date of birth"
              variant="filled"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
:deep(.v-expansion-panel) {
  .v-expansion-panel-title {
    min-height: unset !important;
    padding-left: unset !important;
    padding-right: unset !important;
    padding-bottom: 10px;
    width: unset;

    &__overlay {
      opacity: 0 !important;
    }

    &__icon {
      margin-top: 1px;
    }
  }

  .v-expansion-panel-text {
    &__wrapper {
      padding: 1rem 0;
    }
  }
}
</style>