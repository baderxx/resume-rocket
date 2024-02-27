<script setup lang="ts"></script>
<template>
  <div>
    <expansion-panel>
      <template #content>
        <div class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <form-text-field label="Address" placeholder="Enter your address" />
          </div>
          <div>
            <form-text-field
              label="Postal code"
              placeholder="Enter your postal code"
            />
          </div>
          <div>
            <form-text-field
              label="Driving license"
              placeholder="Enter your driving license"
            />
          </div>
          <div>
            <form-text-field
              label="Nationality"
              placeholder="Enter your nationality"
            />
          </div>
          <div>
            <form-text-field
              label="Place of birth"
              placeholder="Enter your place of birth"
            />
          </div>
          <div>
            <form-text-field
              label="Address"
              placeholder="Enter your date of birth"
            />
          </div>
        </div>
      </template>
      <template #activator="{ click, isOpen }">
        <text-button class="mt-4" @click="click">
          <!-- #TODO: add icon -->
          <span>Additional Information</span>
        </text-button>
      </template>
    </expansion-panel>
  </div>
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
