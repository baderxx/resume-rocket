<script lang="ts" setup>
import type { Component } from "vue";
import { computed, ref } from "vue";

import ClassicTemplate from "@/components/Resume/Templates/ClassicTemplate.vue";
import ModernTemplate from "@/components/Resume/Templates/ModernTemplate.vue";
import SpotlightTemplate from "@/components/Resume/Templates/SpotlightTemplate.vue";
import ResumeTemplateSelector from "@/components/Resume/TemplateSelector.vue";
import { useResumeInformation } from "@/composables/useResumeInformation";
import type { ResumeInformation } from "@/types/resumeData";

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  component: Component;
  previewResume?: ResumeInformation;
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
    tags: ["ATS friendly", "Two column"],
  },
  {
    id: "modern",
    name: "Modern Focus",
    description:
      "Strong sidebar contrast and modern section dividers for standout details.",
    component: ModernTemplate,
    tags: ["Minimal", "Contrast"],
  },
  {
    id: "spotlight",
    name: "Spotlight",
    description:
      "Hero summary ribbon paired with clean sections to spotlight achievements.",
    component: SpotlightTemplate,
    tags: ["Profile first", "Hiring ready"],
  },
];

const { resumeData } = useResumeInformation();

const selectedTemplateId = ref(templates[0]?.id ?? "");
const isTemplateGalleryVisible = ref(true);

const selectedTemplate = computed<ResumeTemplate | undefined>(() =>
  templates.find((template) => template.id === selectedTemplateId.value),
);
const hasTemplates = computed(() => templates.length > 0);

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
  return resumeData.value as DisplayResume;
});

const isUsingEmptyData = computed(() => !hasUserContent.value);

const handleTemplateChange = (templateId: string) => {
  selectedTemplateId.value = templateId;
  isTemplateGalleryVisible.value = true;
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
        <div class="flex items-center gap-2">
          <button
            class="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            type="button"
            @click="isTemplateGalleryVisible = !isTemplateGalleryVisible"
          >
            {{ isTemplateGalleryVisible ? "Hide" : "Show" }} template gallery
          </button>
        </div>
      </div>
    </div>

    <div class="grid place-content-center">
      <div class="relative">
        <div
          class="resume-preview select-none overflow-hidden rounded-xl bg-white shadow-2xl ring-2 ring-white/10"
        >
          <component
            v-if="selectedTemplate"
            :is="selectedTemplate.component"
            :resume="displayResumeData"
          />
          <div
            v-else
            class="flex h-full items-center justify-center bg-slate-50 text-center text-sm font-semibold text-slate-500"
          >
            No templates available. Add a template to see your resume preview.
          </div>
        </div>
        <div
          v-if="isUsingEmptyData"
          class="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow"
        >
          Start adding your details to see them reflected here.
        </div>
      </div>
    </div>

    <div
      class="rounded-2xl border border-white/15 bg-slate-900/60 p-4 shadow-inner ring-1 ring-white/10"
    >
      <div
        class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p class="text-lg font-semibold text-white">Template gallery</p>
          <p class="text-sm text-white/70">
            Browse layouts in grid or list view and apply them instantly.
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-white/70">
          <span class="rounded-full bg-white/10 px-3 py-1 font-semibold">
            {{ hasTemplates ? templates.length : 0 }} templates
          </span>
          <button
            class="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            type="button"
            @click="isTemplateGalleryVisible = !isTemplateGalleryVisible"
          >
            {{ isTemplateGalleryVisible ? "Hide" : "Show" }} gallery
          </button>
        </div>
      </div>
      <Transition name="fade">
        <div v-if="isTemplateGalleryVisible" class="mt-4">
          <ResumeTemplateSelector
            v-if="hasTemplates"
            :templates="templates"
            :selected-template-id="selectedTemplateId"
            :preview-resume="displayResumeData"
            @update:selected-template-id="handleTemplateChange"
          />
          <div
            v-else
            class="rounded-md border border-dashed border-white/30 bg-white/5 p-4 text-sm text-white/80"
          >
            No templates available. Add templates to see previews and enable
            switching.
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.resume-preview {
  height: 842px;
  width: 592px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
