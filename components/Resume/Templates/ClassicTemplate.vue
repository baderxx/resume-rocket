<script setup lang="ts">
import type { DateRange, ResumeInformation } from "@/types/resumeData";
import { computed } from "vue";

type PartialResume = Partial<ResumeInformation> & {
  employmentHistory?: Partial<ResumeInformation["employmentHistory"][number]>[];
  education?: Partial<ResumeInformation["education"][number]>[];
  skills?: Partial<ResumeInformation["skills"][number]>[];
  languages?: Partial<ResumeInformation["languages"][number]>[];
  projects?: Partial<ResumeInformation["projects"][number]>[];
};

const props = defineProps<{
  resume: PartialResume;
}>();

const fullName = computed(() => {
  const name = [props.resume.firstName, props.resume.lastName]
    .filter(Boolean)
    .join(" ");
  return name || "Your Name";
});

const summaryText = computed(
  () =>
    props.resume.professionalSummary ||
    "Add a short professional summary to highlight your impact and specialties.",
);

const safeHistory = computed(() => props.resume.employmentHistory ?? []);
const safeEducation = computed(() => props.resume.education ?? []);
const safeSkills = computed(() => props.resume.skills ?? []);
const safeLanguages = computed(() => props.resume.languages ?? []);
const safeProjects = computed(() => props.resume.projects ?? []);

const formatDateRange = (range?: DateRange | string) => {
  if (!range) return "";
  if (typeof range === "string") return range;
  const { startDate, endDate } = range;
  if (!startDate && !endDate) return "";
  return [startDate, endDate || "Present"].filter(Boolean).join(" — ");
};
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden rounded bg-white text-gray-900"
  >
    <header class="bg-slate-900 px-7 py-5 text-white">
      <p class="text-3xl font-bold leading-tight">{{ fullName }}</p>
      <p class="text-lg font-semibold text-slate-200">
        {{ resume.jobTitle || "Role / Title" }}
      </p>
      <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-200/90">
        <span v-if="resume.email">{{ resume.email }}</span>
        <span v-if="resume.phoneNumber">{{ resume.phoneNumber }}</span>
        <span v-if="resume.city">{{ resume.city }}</span>
        <span v-if="resume.country">{{ resume.country }}</span>
      </div>
    </header>

    <div class="grid flex-1 grid-cols-3 gap-5 p-7">
      <section class="col-span-2 space-y-6">
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Professional Summary
          </p>
          <p class="mt-2 text-sm leading-relaxed text-slate-800">
            {{ summaryText }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Experience
          </p>
          <div v-if="safeHistory.length" class="mt-3 space-y-4">
            <article
              v-for="(item, index) in safeHistory"
              :key="index"
              class="space-y-1"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <p class="text-base font-semibold text-slate-900">
                  {{ item.jobTitle || "Job title" }}
                </p>
                <p
                  class="text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {{ formatDateRange(item.startAndEndDate) || "Dates" }}
                </p>
              </div>
              <p class="text-sm font-medium text-slate-700">
                {{ item.employer || "Company"
                }}<span v-if="item.city"> • {{ item.city }}</span>
              </p>
              <p class="text-sm leading-relaxed text-slate-700">
                {{
                  item.description ||
                  "Summarize your responsibilities and impact."
                }}
              </p>
            </article>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your work history to showcase the outcomes you delivered.
          </p>
        </div>

        <div v-if="safeProjects.length">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Projects
          </p>
          <div class="mt-3 space-y-3">
            <article
              v-for="(project, index) in safeProjects"
              :key="index"
              class="space-y-1"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="text-sm font-semibold text-slate-900">
                  {{ project.projectName }}
                </p>
                <p
                  class="text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {{ formatDateRange(project.startAndEndDate) || "Year" }}
                </p>
              </div>
              <p class="text-xs font-medium text-slate-700">
                <span v-if="project.url" class="text-slate-600">{{
                  project.url
                }}</span>
              </p>
              <p class="text-sm leading-relaxed text-slate-700">
                {{ project.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <aside class="space-y-5">
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Education
          </p>
          <div v-if="safeEducation.length" class="mt-3 space-y-3">
            <div
              v-for="(item, index) in safeEducation"
              :key="index"
              class="space-y-0.5"
            >
              <p class="text-sm font-semibold text-slate-900">
                {{ item.degree }}
              </p>
              <p class="text-sm text-slate-700">{{ item.school }}</p>
              <p
                class="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ formatDateRange(item.startAndEndDate) || item.city }}
              </p>
              <p class="text-xs text-slate-600">{{ item.description }}</p>
            </div>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your education history here.
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Skills
          </p>
          <div v-if="safeSkills.length" class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in safeSkills"
              :key="index"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {{ skill.skillName }}
            </span>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your core skills to highlight expertise.
          </p>
        </div>

        <div v-if="safeLanguages.length">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Languages
          </p>
          <ul class="mt-2 space-y-1">
            <li
              v-for="(language, index) in safeLanguages"
              :key="index"
              class="flex justify-between text-sm"
            >
              <span class="font-semibold text-slate-800">{{
                language.language
              }}</span>
              <span class="text-slate-600">{{ language.fluency }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
