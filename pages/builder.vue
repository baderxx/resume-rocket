<script lang="ts" setup>
import type { EditorFieldSchema, Section } from "@/types/builder";
import { EDITOR_FIELDS } from "@/types/builder";

const sectionTitle = computed(() => {
  return "Employment History";
});

const sectionSubtitle = computed(() => {
  return "Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).";
});

const experienceSection = computed<Section>(() => ({
  title: sectionTitle.value,
  subtitle: sectionSubtitle.value,
  formTemplate: experienceFormTemplate.value, // #TODO: Add inline schema for section
  type: "some type", // #TODO: figure this out
  addActionText: "Add one or more experience items",
  dataKey: "employmentHistory",
  itemTitleTemplate: [
    { fieldName: "jobTitle" },
    { text: "at" },
    { fieldName: "employer" },
  ],
}));

const educationSection = computed<Section>(() => ({
  title: sectionTitle.value,
  subtitle: sectionSubtitle.value,
  formTemplate: experienceFormTemplate.value, // #TODO: Add inline schema for section
  type: "some type", // #TODO: figure this out
  addActionText: "Add one or more experience items",
  dataKey: "education",
  itemTitleTemplate: [
    { fieldName: "jobTitle" },
    { text: "at" },
    { fieldName: "employer" },
  ],
}));

const builderSections = computed<Section[]>(() => {
  return [experienceSection.value, educationSection.value];
});

const experienceFormTemplate = computed<EditorFieldSchema[]>(() => {
  return [
    {
      title: "Job Title",
      type: EDITOR_FIELDS.TEXT,
      value: "",
      fieldName: "jobTitle",
      cols: 6,
    },
    {
      title: "Employer",
      type: EDITOR_FIELDS.TEXT,
      value: "",
      fieldName: "employer",
      cols: 6,
    },
    {
      title: "Start & End Date",
      type: EDITOR_FIELDS.START_AND_END_DATE,
      value: "",
      fieldName: "startAndEndDate",
      cols: 6,
    },
    {
      title: "City",
      type: EDITOR_FIELDS.TEXT,
      value: "",
      fieldName: "city",
      cols: 6,
    },
    {
      title: "Description",
      type: EDITOR_FIELDS.EDITOR,
      value: "",
      fieldName: "description",
      cols: 12,
    },
  ];
});
</script>
<template>
  <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
    <div class="h-screen overflow-y-scroll py-8">
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
    <div class="bg-black">
      <resume-preview />
    </div>
  </div>
</template>
