<script setup lang="ts">
import type { DateRange, ResumeInformation } from "@/types/resumeData";
import { computed } from "vue";

type PartialResume = Partial<ResumeInformation> & {
  employmentHistory?: Partial<ResumeInformation["employmentHistory"][number]>[];
  education?: Partial<ResumeInformation["education"][number]>[];
  skills?: Partial<ResumeInformation["skills"][number]>[];
  projects?: Partial<ResumeInformation["projects"][number]>[];
  socialLinks?: Partial<ResumeInformation["socialLinks"][number]>[];
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

const safeHistory = computed(() => props.resume.employmentHistory ?? []);
const safeEducation = computed(() => props.resume.education ?? []);
const safeSkills = computed(() => props.resume.skills ?? []);
const safeProjects = computed(() => props.resume.projects ?? []);
const safeSocialLinks = computed(() => props.resume.socialLinks ?? []);

const formatDateRange = (range?: DateRange | string) => {
  if (!range) return "";
  if (typeof range === "string") return range;
  const { startDate, endDate } = range;
  if (!startDate && !endDate) return "";
  return [startDate, endDate || "Present"].filter(Boolean).join(" — ");
};
</script>

<template>
  <div class="flex h-full overflow-hidden rounded bg-white text-gray-900">
    <aside
      class="flex w-64 flex-col justify-between bg-gradient-to-b from-indigo-900 to-slate-900 p-6 text-white"
    >
      <div class="space-y-3">
        <div>
          <p class="text-xl font-bold leading-tight">{{ fullName }}</p>
          <p class="text-sm text-indigo-100">
            {{ resume.jobTitle || "Role / Title" }}
          </p>
        </div>
        <div class="space-y-1 text-sm text-indigo-100/90">
          <p v-if="resume.email">{{ resume.email }}</p>
          <p v-if="resume.phoneNumber">{{ resume.phoneNumber }}</p>
          <p v-if="resume.city">{{ resume.city }}</p>
        </div>
        <div v-if="safeSocialLinks.length" class="pt-2">
          <p
            class="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200"
          >
            Links
          </p>
          <ul class="mt-2 space-y-1 text-sm text-indigo-100/90">
            <li v-for="(link, index) in safeSocialLinks" :key="index">
              {{ link.label }}
              <span v-if="link.url" class="block text-indigo-200/80">{{
                link.url
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="space-y-2">
        <p
          class="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200"
        >
          Skills
        </p>
        <div v-if="safeSkills.length" class="flex flex-wrap gap-2">
          <span
            v-for="(skill, index) in safeSkills"
            :key="index"
            class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
          >
            {{ skill.skillName }}
          </span>
        </div>
        <p v-else class="text-xs text-indigo-100/80">
          Add skills to show your strengths.
        </p>
      </div>
    </aside>

    <main class="flex-1 space-y-6 p-7">
      <section class="rounded-lg border border-indigo-100 bg-indigo-50/60 p-4">
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-800"
        >
          Profile
        </p>
        <p class="mt-2 text-sm leading-relaxed text-indigo-900">
          {{
            resume.professionalSummary ||
            "Share a short introduction to help employers understand what you bring to the table."
          }}
        </p>
      </section>

      <section>
        <div class="flex items-center justify-between">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Experience
          </p>
          <div
            class="h-px flex-1 bg-gradient-to-r from-slate-300/70 to-transparent"
          />
        </div>
        <div v-if="safeHistory.length" class="mt-3 space-y-4">
          <article
            v-for="(item, index) in safeHistory"
            :key="index"
            class="rounded-lg border border-slate-200/70 p-4 shadow-sm"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <p class="text-sm font-semibold text-slate-900">
                {{ item.jobTitle || "Job title" }}
              </p>
              <p
                class="text-[11px] font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ formatDateRange(item.startAndEndDate) || "Dates" }}
              </p>
            </div>
            <p class="text-sm text-slate-700">
              {{ item.employer || "Company"
              }}<span v-if="item.city"> • {{ item.city }}</span>
            </p>
            <p class="mt-1 text-sm leading-relaxed text-slate-700">
              {{
                item.description ||
                "Describe the results and responsibilities for this role."
              }}
            </p>
          </article>
        </div>
        <p v-else class="mt-2 text-sm text-slate-500">
          Add your experience to show your impact.
        </p>
      </section>

      <section>
        <div class="flex items-center justify-between">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Projects
          </p>
          <div
            class="h-px flex-1 bg-gradient-to-r from-slate-300/70 to-transparent"
          />
        </div>
        <div v-if="safeProjects.length" class="mt-3 grid gap-3 md:grid-cols-2">
          <article
            v-for="(project, index) in safeProjects"
            :key="index"
            class="rounded-lg border border-slate-200/70 bg-slate-50/80 p-3"
          >
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-slate-900">
                {{ project.projectName }}
              </p>
              <p
                class="text-[11px] font-semibold uppercase tracking-wide text-slate-500"
              >
                {{ formatDateRange(project.startAndEndDate) || "Year" }}
              </p>
            </div>
            <p v-if="project.url" class="text-xs text-indigo-700">
              {{ project.url }}
            </p>
            <p class="mt-1 text-sm leading-relaxed text-slate-700">
              {{ project.description }}
            </p>
          </article>
        </div>
        <p v-else class="mt-2 text-sm text-slate-500">
          Add projects to highlight extra wins.
        </p>
      </section>

      <section>
        <div class="flex items-center justify-between">
          <p
            class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Education
          </p>
          <div
            class="h-px flex-1 bg-gradient-to-r from-slate-300/70 to-transparent"
          />
        </div>
        <div v-if="safeEducation.length" class="mt-3 space-y-3">
          <article v-for="(item, index) in safeEducation" :key="index">
            <p class="text-sm font-semibold text-slate-900">
              {{ item.degree }}
            </p>
            <p class="text-sm text-slate-700">{{ item.school }}</p>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              {{ formatDateRange(item.startAndEndDate) || item.city }}
            </p>
            <p class="text-xs text-slate-600">{{ item.description }}</p>
          </article>
        </div>
        <p v-else class="mt-2 text-sm text-slate-500">
          Add your education background.
        </p>
      </section>
    </main>
  </div>
</template>
