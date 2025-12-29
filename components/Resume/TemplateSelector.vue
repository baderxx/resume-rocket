<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  DeepPartial,
  ResumeInformation,
} from "@/composables/useResumeInformation";

type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  mockData: DeepPartial<ResumeInformation>;
};

const props = defineProps<{
  templates: TemplateDefinition[];
  selectedTemplateId?: string;
}>();

const emit = defineEmits<{
  (event: "update:selectedTemplateId", value: string): void;
}>();

const viewMode = ref<"grid" | "list">("grid");

const hasTemplates = computed(() => props.templates?.length > 0);

function handleSelect(templateId: string) {
  emit("update:selectedTemplateId", templateId);
}

function displayName(mockData: DeepPartial<ResumeInformation>) {
  const { firstName, lastName } = mockData ?? {};
  if (firstName || lastName) {
    return `${firstName ?? ""} ${lastName ?? ""}`.trim();
  }
  return "Preview Candidate";
}
</script>

<template>
  <div class="rounded-xl bg-slate-900/60 p-4 text-white shadow-lg">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <font-awesome-icon
          class="text-sm text-slate-200"
          :icon="['fas', 'table-cells']"
        />
        <p class="text-lg font-semibold">Template Gallery</p>
      </div>
      <div
        class="inline-flex overflow-hidden rounded-lg border border-slate-700"
      >
        <button
          class="px-3 py-2 text-sm transition-colors"
          :class="viewMode === 'grid' ? 'bg-slate-700' : 'hover:bg-slate-800'"
          type="button"
          @click="viewMode = 'grid'"
        >
          Grid
        </button>
        <button
          class="border-l border-slate-700 px-3 py-2 text-sm transition-colors"
          :class="viewMode === 'list' ? 'bg-slate-700' : 'hover:bg-slate-800'"
          type="button"
          @click="viewMode = 'list'"
        >
          List
        </button>
      </div>
    </div>

    <div
      v-if="!hasTemplates"
      class="mt-4 rounded-lg border border-dashed border-slate-700 p-4 text-slate-200"
    >
      No templates are available yet. Add templates to preview and select them
      here.
    </div>
    <div
      v-else
      class="mt-4"
      :class="
        viewMode === 'grid'
          ? 'grid grid-cols-1 gap-3 md:grid-cols-2'
          : 'space-y-3'
      "
    >
      <button
        v-for="template in templates"
        :key="template.id"
        class="w-full rounded-lg border border-slate-800 bg-slate-800/60 p-4 text-left transition hover:border-indigo-400 hover:bg-slate-800"
        :class="
          template.id === selectedTemplateId ? 'ring-2 ring-indigo-400' : ''
        "
        type="button"
        @click="handleSelect(template.id)"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-base font-semibold">{{ template.name }}</p>
            <p class="text-sm text-slate-200">{{ template.description }}</p>
          </div>
          <span
            v-if="template.id === selectedTemplateId"
            class="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200"
          >
            Selected
          </span>
        </div>
        <div class="mt-3 rounded-lg bg-white/5 p-3 text-sm text-slate-100">
          <div class="flex items-center justify-between">
            <p class="font-semibold">{{ displayName(template.mockData) }}</p>
            <p class="text-xs uppercase tracking-wide text-slate-300">
              {{ template.mockData.jobTitle || "Preview Role" }}
            </p>
          </div>
          <p class="mt-1 text-xs text-slate-200">
            {{
              template.mockData.professionalSummary ||
              "A short snapshot of the candidate will appear here."
            }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>
