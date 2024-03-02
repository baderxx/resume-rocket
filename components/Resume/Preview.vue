<script lang="ts" setup>
import { useResumeInformation } from "@/composables/useResumeInformation";

const { resumeData } = useResumeInformation();
</script>
<template>
  <div class="grid place-content-center">
    <div class="grid grid-cols-2 py-5">
      <!-- #TODO: move this to a component -->
      <div class="text-white">
        <font-awesome-icon class="me-2" :icon="['fas', 'border-none']" />
        <button>Select Template</button>
        <div class="border-r border-gray-300"></div>
      </div>
      <div class="place-self-end">b</div>
    </div>
    <div class="resume-preview select-none overflow-hidden rounded bg-white">
      <!-- #TODO: move this to a template hoc -->
      <div class="grid">
        <div class="m-10">
          <h1>{{ resumeData.firstName }} {{ resumeData.lastName }}</h1>
          <p>{{ resumeData.jobTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.resume-preview {
  height: 842px;
  width: 592px;
}
</style>
