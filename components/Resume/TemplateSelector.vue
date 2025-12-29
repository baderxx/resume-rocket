<script setup lang="ts">
import { ref } from "vue";
import type { Component } from "vue";
import type { ResumeInformation } from "@/types/resumeData";

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  component: Component;
  previewResume: ResumeInformation;
  tags?: string[];
};

const { templates, selectedTemplateId } = defineProps<{
  templates: ResumeTemplate[];
  selectedTemplateId: string;
}>();

const emit = defineEmits<{
  (event: "update:selectedTemplateId", value: string): void;
}>();

const layoutMode = ref<"grid" | "list">("grid");

const formatName = (resume: ResumeInformation) => {
  const fullName = [resume.firstName, resume.lastName]
    .filter(Boolean)
    .join(" ");

  return fullName || "Template preview";
};

const truncate = (value: string, limit = 140) => {
  if (!value) return "Add a short overview to highlight the template.";
  return value.length > limit ? `${value.slice(0, limit)}…` : value;
};

const changeTemplate = (id: string) => emit("update:selectedTemplateId", id);
</script>

<template>
  <div class="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
    <div
      class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-center gap-2 text-white">
        <font-awesome-icon class="text-lg" :icon="['fas', 'pencil']" />
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide">Templates</p>
          <p class="text-xs text-white/70">
            Switch layouts without losing your data.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs font-medium text-white">
        <button
          class="rounded-full border border-white/20 px-3 py-1 transition hover:border-white"
          :class="{ 'bg-white/20': layoutMode === 'grid' }"
          type="button"
          @click="layoutMode = 'grid'"
        >
          Grid
        </button>
        <button
          class="rounded-full border border-white/20 px-3 py-1 transition hover:border-white"
          :class="{ 'bg-white/20': layoutMode === 'list' }"
          type="button"
          @click="layoutMode = 'list'"
        >
          List
        </button>
      </div>
    </div>

    <div
      v-if="templates.length"
      class="mt-3 grid gap-3"
      :class="layoutMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'"
    >
      <article
        v-for="template in templates"
        :key="template.id"
        class="group rounded-lg border border-white/15 bg-white/5 p-3 text-white shadow-sm transition hover:border-white/30"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-base font-semibold">{{ template.name }}</p>
            <p class="text-xs text-white/70">{{ template.description }}</p>
          </div>
          <span
            v-if="selectedTemplateId === template.id"
            class="rounded-full border border-emerald-200/60 bg-emerald-100/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-50"
          >
            Active
          </span>
        </div>

        <div
          class="mt-3 rounded-md border border-white/15 bg-white/80 p-3 text-gray-900 shadow-inner"
        >
          <div class="flex flex-col gap-2">
            <div>
              <p class="text-sm font-semibold">
                {{ formatName(template.previewResume) }}
              </p>
              <p class="text-xs text-gray-600">
                {{ template.previewResume.jobTitle }}
              </p>
            </div>
            <p class="text-xs leading-relaxed text-gray-700">
              {{ truncate(template.previewResume.professionalSummary) }}
            </p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="(tag, idx) in template.tags ?? [
                  'ATS friendly',
                  'Quick to scan',
                ]"
                :key="`${template.id}-${idx}`"
                class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <button
          class="mt-3 w-full rounded-md border border-white/25 px-3 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
          :class="{ 'bg-white/15': selectedTemplateId === template.id }"
          type="button"
          @click="changeTemplate(template.id)"
        >
          {{ selectedTemplateId === template.id ? "Selected" : "Use template" }}
        </button>
      </article>
    </div>

    <div
      v-else
      class="mt-4 rounded-md border border-dashed border-white/30 bg-white/5 p-4 text-sm text-white/80"
    >
      No templates are available yet. Templates you add will appear here.
    </div>
  </div>
</template>
