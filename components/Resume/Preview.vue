<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Component } from "vue";

import { useResumeInformation } from "@/composables/useResumeInformation";
import ClassicTemplate from "@/components/Resume/Templates/ClassicTemplate.vue";
import ModernTemplate from "@/components/Resume/Templates/ModernTemplate.vue";
import ResumeTemplateSelector from "@/components/Resume/TemplateSelector.vue";
import {
  mockResumeInformation,
  modernMockResumeInformation,
} from "@/utils/mockResumeData";
import type { ResumeInformation } from "@/types/resumeData";

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  component: Component;
  previewResume: ResumeInformation;
  tags?: string[];
};

type DisplayResume = Partial<ResumeInformation> & {
  employmentHistory?: Partial<ResumeInformation["employmentHistory"][number]>[];
  education?: Partial<ResumeInformation["education"][number]>[];
  projects?: Partial<ResumeInformation["projects"][number]>[];
  skills?: Partial<ResumeInformation["skills"][number]>[];
  socialLinks?: Partial<ResumeInformation["socialLinks"][number]>[];
  languages?: Partial<ResumeInformation["languages"][number]>[];
  references?: Partial<ResumeInformation["references"][number]>[];
};

const templates: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "A balanced two-column layout with bold headers and clean typography.",
    component: ClassicTemplate,
    previewResume: mockResumeInformation,
    tags: ["ATS friendly", "Two column"],
  },
  {
    id: "modern",
    name: "Modern Focus",
    description:
      "Strong sidebar contrast and modern section dividers for standout details.",
    component: ModernTemplate,
    previewResume: modernMockResumeInformation,
    tags: ["Minimal", "Contrast"],
  },
];

const { resumeData } = useResumeInformation();

const selectedTemplateId = ref(templates[0].id);
const isTemplateModalOpen = ref(false);

const selectedTemplate = computed<ResumeTemplate | undefined>(() =>
  templates.find((template) => template.id === selectedTemplateId.value),
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

  const hasCollections = arrayFields.some(
    (field) => Array.isArray(field) && field.length > 0,
  );

  return hasText || hasCollections;
});

const displayResumeData = computed<DisplayResume>(() => {
  if (hasUserContent.value) {
    return resumeData.value as DisplayResume;
  }

  return selectedTemplate.value?.previewResume ?? mockResumeInformation;
});

const isUsingMockData = computed(() => !hasUserContent.value);

const openTemplateModal = () => {
  isTemplateModalOpen.value = true;
};

const closeTemplateModal = () => {
  isTemplateModalOpen.value = false;
};

const handleTemplateChange = (templateId: string) => {
  selectedTemplateId.value = templateId;
  closeTemplateModal();
};
</script>
<template>
  <div class="flex flex-col gap-4 p-6 text-white">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="text-sm font-semibold text-white/80">Preview</p>
        <p class="text-xs text-white/60">
          Choose a template to update the resume preview.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span
          class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
        >
          {{ selectedTemplate?.name ?? "Classic" }}
        </span>
        <button
          class="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          type="button"
          @click="openTemplateModal"
        >
          Select template
        </button>
      </div>
    </div>

    <div class="grid place-content-center">
      <div class="relative">
        <div
          class="resume-preview select-none overflow-hidden rounded-xl bg-white shadow-2xl ring-2 ring-white/10"
        >
          <component
            :is="selectedTemplate?.component ?? 'div'"
            :resume="displayResumeData"
          />
        </div>
        <div
          v-if="isUsingMockData"
          class="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow"
        >
          Showing example data. Start editing to personalize.
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isTemplateModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/20 bg-slate-800/95 p-4 shadow-2xl ring-1 ring-white/10"
        >
          <div class="mb-3 flex items-center justify-between">
            <div>
              <p class="text-lg font-semibold text-white">Select a template</p>
              <p class="text-sm text-white/70">
                Switch templates anytime. Your resume data will stay intact.
              </p>
            </div>
            <button
              class="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white/60"
              type="button"
              @click="closeTemplateModal"
            >
              Close
            </button>
          </div>
          <ResumeTemplateSelector
            :templates="templates"
            :selected-template-id="selectedTemplateId"
            @update:selected-template-id="handleTemplateChange"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.resume-preview {
  height: 842px;
  width: 592px;
}
</style>
