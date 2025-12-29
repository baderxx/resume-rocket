<script setup lang="ts">
import type { DateRange, ResumeInformation } from "@/types/resumeData";
import { computed } from "vue";

type PartialResume = Partial<ResumeInformation> & {
  employmentHistory?: Partial<ResumeInformation["employmentHistory"][number]>[];
  education?: Partial<ResumeInformation["education"][number]>[];
  skills?: Partial<ResumeInformation["skills"][number]>[];
  projects?: Partial<ResumeInformation["projects"][number]>[];
  socialLinks?: Partial<ResumeInformation["socialLinks"][number]>[];
  languages?: Partial<ResumeInformation["languages"][number]>[];
  references?: Partial<ResumeInformation["references"][number]>[];
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

const heroSummary = computed(
  () =>
    props.resume.professionalSummary ||
    "Add a short summary to introduce yourself and highlight the outcomes you deliver.",
);

const safeHistory = computed(() => props.resume.employmentHistory ?? []);
const safeEducation = computed(() => props.resume.education ?? []);
const safeSkills = computed(() => props.resume.skills ?? []);
const safeProjects = computed(() => props.resume.projects ?? []);
const safeSocialLinks = computed(() => props.resume.socialLinks ?? []);
const safeLanguages = computed(() => props.resume.languages ?? []);
const safeReferences = computed(() => props.resume.references ?? []);

const formatDateRange = (range?: DateRange | string) => {
  if (!range) return "";
  if (typeof range === "string") return range;
  const { startDate, endDate } = range;
  if (!startDate && !endDate) return "";
  return [startDate, endDate || "Present"].filter(Boolean).join(" – ");
};
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden rounded bg-white text-slate-900">
    <header class="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-7 text-white">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-3xl font-black leading-tight drop-shadow-sm">
            {{ fullName }}
          </p>
          <p class="text-lg font-semibold text-orange-100">
            {{ resume.jobTitle || "Role / Title" }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3 text-sm text-orange-50/90">
          <span v-if="resume.email" class="rounded-full bg-white/10 px-3 py-1">
            {{ resume.email }}
          </span>
          <span v-if="resume.phoneNumber" class="rounded-full bg-white/10 px-3 py-1">
            {{ resume.phoneNumber }}
          </span>
          <span v-if="resume.city || resume.country" class="rounded-full bg-white/10 px-3 py-1">
            {{ [resume.city, resume.country].filter(Boolean).join(", ") }}
          </span>
        </div>
      </div>
      <div class="mt-4 rounded-lg bg-white/10 p-4 shadow-inner">
        <p class="text-sm leading-relaxed text-orange-50">
          {{ heroSummary }}
        </p>
      </div>
    </header>

    <div class="grid flex-1 grid-cols-3 gap-6 p-7">
      <main class="col-span-2 space-y-5">
        <section>
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Experience
            </p>
            <div class="h-px flex-1 bg-gradient-to-r from-slate-300/80 to-transparent" />
          </div>
          <div v-if="safeHistory.length" class="mt-3 space-y-4">
            <article
              v-for="(item, index) in safeHistory"
              :key="index"
              class="rounded-lg border border-amber-100 bg-amber-50/60 p-4 shadow-sm"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <p class="text-base font-semibold text-slate-900">
                  {{ item.jobTitle || "Job title" }}
                </p>
                <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                  {{ formatDateRange(item.startAndEndDate) || "Dates" }}
                </p>
              </div>
              <p class="text-sm text-slate-700">
                {{ item.employer || "Company" }}<span v-if="item.city"> • {{ item.city }}</span>
              </p>
              <p class="mt-1 text-sm leading-relaxed text-slate-700">
                {{
                  item.description ||
                    "Describe the highlights and wins from this role, focusing on outcomes."
                }}
              </p>
            </article>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your work history to highlight what you've achieved.
          </p>
        </section>

        <section>
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Projects
            </p>
            <div class="h-px flex-1 bg-gradient-to-r from-slate-300/80 to-transparent" />
          </div>
          <div v-if="safeProjects.length" class="mt-3 grid gap-3 sm:grid-cols-2">
            <article
              v-for="(project, index) in safeProjects"
              :key="index"
              class="rounded-lg border border-slate-200/70 bg-white p-3 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-slate-900">
                  {{ project.projectName || "Project" }}
                </p>
                <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {{ formatDateRange(project.startAndEndDate) || "Year" }}
                </p>
              </div>
              <p v-if="project.url" class="text-xs text-amber-700">{{ project.url }}</p>
              <p class="mt-1 text-sm leading-relaxed text-slate-700">
                {{ project.description || "Share what you built and its impact." }}
              </p>
            </article>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add projects to showcase extra wins and initiatives.
          </p>
        </section>

        <section v-if="safeReferences.length">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              References
            </p>
            <div class="h-px flex-1 bg-gradient-to-r from-slate-300/80 to-transparent" />
          </div>
          <div class="mt-3 space-y-2">
            <article
              v-for="(reference, index) in safeReferences"
              :key="index"
              class="rounded-lg border border-slate-200/70 bg-slate-50/80 p-3"
            >
              <p class="text-sm font-semibold text-slate-900">
                {{ reference.referenceFullName || "Reference name" }}
              </p>
              <p class="text-xs text-slate-700">
                {{ reference.company }}<span v-if="reference.phone"> • {{ reference.phone }}</span>
              </p>
              <p v-if="reference.email" class="text-xs text-amber-700">
                {{ reference.email }}
              </p>
            </article>
          </div>
        </section>
      </main>

      <aside class="space-y-5">
        <section>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Skills
          </p>
          <div v-if="safeSkills.length" class="mt-2 space-y-1">
            <div v-for="(skill, index) in safeSkills" :key="index" class="space-y-1">
              <div class="flex items-center justify-between text-sm text-slate-800">
                <span class="font-semibold">{{ skill.skillName }}</span>
                <span class="text-[11px] text-slate-500">
                  {{ skill.expertiseLevel ? `Level ${skill.expertiseLevel}` : "" }}
                </span>
              </div>
              <div class="h-1.5 rounded-full bg-slate-200">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                  :style="{ width: `${Math.min((skill.expertiseLevel ?? 3) * 20, 100)}%` }"
                />
              </div>
            </div>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your key skills to showcase your strengths.
          </p>
        </section>

        <section>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Education
          </p>
          <div v-if="safeEducation.length" class="mt-3 space-y-2">
            <article
              v-for="(item, index) in safeEducation"
              :key="index"
              class="rounded-md border border-slate-200/70 bg-white p-3"
            >
              <p class="text-sm font-semibold text-slate-900">{{ item.degree }}</p>
              <p class="text-sm text-slate-700">{{ item.school }}</p>
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {{ formatDateRange(item.startAndEndDate) || item.city }}
              </p>
            </article>
          </div>
          <p v-else class="mt-2 text-sm text-slate-500">
            Add your education background to round out your story.
          </p>
        </section>

        <section v-if="safeLanguages.length">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Languages
          </p>
          <ul class="mt-2 space-y-1">
            <li
              v-for="(language, index) in safeLanguages"
              :key="index"
              class="flex justify-between text-sm"
            >
              <span class="font-semibold text-slate-800">{{ language.language }}</span>
              <span class="text-slate-600">{{ language.fluency }}</span>
            </li>
          </ul>
        </section>

        <section v-if="safeSocialLinks.length">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Links
          </p>
          <ul class="mt-2 space-y-1 text-sm text-amber-700">
            <li v-for="(link, index) in safeSocialLinks" :key="index">
              {{ link.label }}<span v-if="link.url" class="block text-slate-700">{{ link.url }}</span>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>
