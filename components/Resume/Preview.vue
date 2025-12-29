<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Component } from "vue";

import { useResumeInformation } from "@/composables/useResumeInformation";
import ClassicTemplate from "@/components/Resume/Templates/ClassicTemplate.vue";
import ModernTemplate from "@/components/Resume/Templates/ModernTemplate.vue";
import ResumeTemplateSelector from "@/components/Resume/TemplateSelector.vue";
import { mockResumeInformation, modernMockResumeInformation } from "@/utils/mockResumeData";
import type { ResumeInformation } from "@/types/resumeData";

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  component: Component;
  previewResume: ResumeInformation;
  tags?: string[];
};

const templates: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "A balanced two-column layout with bold headers and clean typography.",
    component: ClassicTemplate,
    previewResume: mockResumeInformation,
    tags: ["ATS friendly", "Two column"],
  },
  {
    id: "modern",
    name: "Modern Focus",
    description: "Strong sidebar contrast and modern section dividers for standout details.",
    component: ModernTemplate,
    previewResume: modernMockResumeInformation,
    tags: ["Minimal", "Contrast"],
  },
];

const { resumeData } = useResumeInformation();

const selectedTemplateId = ref(templates[0].id);

const selectedTemplate = computed(
  () => templates.find((template) => template.id === selectedTemplateId.value) ?? templates[0],
);

const hasUserContent = computed(() => {
  const stringFields: Array<keyof ResumeInformation> = [
    "firstName",
    "lastName",
    "jobTitle",
    "professionalSummary",
    "email",
    "phoneNumber",
    "city",
    "country",
  ];

  const hasText = stringFields.some((field) => {
    const value = resumeData.value[field];
    return typeof value === "string" && value.trim().length > 0;
  });

  const arrayFields = [
    resumeData.value.employmentHistory,
    resumeData.value.education,
    resumeData.value.projects,
    resumeData.value.skills,
    resumeData.value.socialLinks,
    resumeData.value.languages,
    resumeData.value.references,
  ];

  const hasCollections = arrayFields.some((field) => Array.isArray(field) && field.length > 0);

  return hasText || hasCollections;
});

const displayResumeData = computed(
  () =>
    (hasUserContent.value ? resumeData.value : selectedTemplate.value?.previewResume) ||
    mockResumeInformation,
);

const isUsingMockData = computed(() => !hasUserContent.value);
</script>
<template>
  <div class="flex flex-col gap-4 p-6 text-white">
    <ResumeTemplateSelector
      :templates="templates"
      v-model:selected-template-id="selectedTemplateId"
    />

    <div class="grid place-content-center">
      <div class="relative">
        <div
          class="resume-preview select-none overflow-hidden rounded-xl bg-white shadow-2xl ring-2 ring-white/10"
        >
          <component :is="selectedTemplate?.component ?? 'div'" :resume="displayResumeData" />
        </div>
        <div
          v-if="isUsingMockData"
          class="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow"
        >
          Showing example data. Start editing to personalize.
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
