<script lang="ts" setup>
import { useUseBuilderFormTemplates } from "@/composables/useBuilderFormTemplates";

const { builderSections } = useUseBuilderFormTemplates();
</script>
<template>
  <div class="grid w-lvw grid-flow-col grid-cols-2 grid-rows-1 gap-4">
    <div class="h-screen overflow-y-scroll p-16">
      <personal-information-form />
      <personal-additional-information-form />
      <builder-professional-summary />
      <builder-section
        v-for="(section, idx) in builderSections"
        :key="idx"
        :section-title="section.title"
        :item-title-template="section.itemTitleTemplate"
        :section-subtitle="section.subtitle"
        :form-template="section.formTemplate"
        :add-action-text="section.addActionText"
        :section-data-key="section.dataKey"
      />
    </div>
    <div class="bg-[#656e83]">
      <resume-preview />
    </div>
  </div>
</template>
