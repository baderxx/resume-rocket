<script setup lang="ts">
import { computed } from "vue";
import type {
  DeepPartial,
  ResumeInformation,
} from "@/composables/useResumeInformation";

const props = defineProps<{
  resume: DeepPartial<ResumeInformation>;
}>();

const resume = computed(() => props.resume ?? {});

const employmentHistory = computed(
  () =>
    resume.value.employmentHistory?.filter(
      (item) =>
        item?.jobTitle ||
        item?.employer ||
        item?.description ||
        item?.startAndEndDate,
    ) ?? [],
);

const education = computed(
  () =>
    resume.value.education?.filter(
      (item) =>
        item?.school ||
        item?.degree ||
        item?.description ||
        item?.startAndEndDate,
    ) ?? [],
);

const projects = computed(
  () =>
    resume.value.projects?.filter(
      (item) =>
        item?.projectName ||
        item?.description ||
        item?.startAndEndDate ||
        item?.url,
    ) ?? [],
);

const skills = computed(
  () =>
    resume.value.skills
      ?.filter((item) => item?.skillName)
      ?.map((item) => item.skillName) ?? [],
);

const languages = computed(
  () =>
    resume.value.languages
      ?.filter((item) => item?.language)
      ?.map((item) => item.language) ?? [],
);

const summary = computed(
  () =>
    resume.value.professionalSummary?.toString().trim() ||
    "Add a short professional summary to highlight your strengths and value.",
);

const location = computed(() => {
  const { city, country } = resume.value;
  return [city, country].filter(Boolean).join(", ");
});
</script>

<template>
  <div class="flex h-full flex-col bg-white text-slate-900">
    <header class="bg-slate-900 px-8 py-6 text-white">
      <p class="text-sm uppercase tracking-wide text-slate-200">Resume</p>
      <div class="mt-2 flex flex-wrap items-center gap-3">
        <h1 class="text-3xl font-bold leading-tight">
          {{ resume.firstName || "First" }} {{ resume.lastName || "Last" }}
        </h1>
        <span class="text-lg font-medium text-indigo-200">
          {{ resume.jobTitle || "Your Role" }}
        </span>
      </div>
      <div
        class="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-100"
      >
        <span v-if="resume.email">{{ resume.email }}</span>
        <span v-if="resume.phoneNumber" class="inline-flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'phone']" />
          {{ resume.phoneNumber }}
        </span>
        <span v-if="location" class="inline-flex items-center gap-1">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          {{ location }}
        </span>
      </div>
    </header>

    <div class="flex flex-1 flex-col gap-6 px-8 py-6">
      <section class="space-y-2">
        <h2
          class="text-lg font-semibold uppercase tracking-wide text-slate-700"
        >
          Profile
        </h2>
        <p class="text-sm leading-relaxed text-slate-800">
          {{ summary }}
        </p>
      </section>

      <div class="grid gap-6 md:grid-cols-[1fr_0.9fr]">
        <section class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="h-5 w-1 rounded-full bg-indigo-500"></span>
            <h3
              class="text-base font-semibold uppercase tracking-wide text-slate-800"
            >
              Experience
            </h3>
          </div>
          <div v-if="employmentHistory.length" class="space-y-4">
            <article
              v-for="job in employmentHistory"
              :key="`${job.jobTitle}-${job.employer}`"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p class="text-sm font-semibold">{{ job.jobTitle }}</p>
                  <p class="text-sm text-slate-700">{{ job.employer }}</p>
                </div>
                <p class="text-xs uppercase tracking-wide text-slate-500">
                  {{ job.startAndEndDate || "Add dates" }}
                </p>
              </div>
              <p class="mt-1 text-sm text-slate-700">
                {{
                  job.description ||
                  "Summarize your achievements for this role."
                }}
              </p>
            </article>
          </div>
          <p v-else class="text-sm text-slate-500">
            Add your most recent roles to showcase your impact.
          </p>
        </section>

        <div class="space-y-5">
          <section class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="h-5 w-1 rounded-full bg-indigo-500"></span>
              <h3
                class="text-base font-semibold uppercase tracking-wide text-slate-800"
              >
                Skills
              </h3>
            </div>
            <div v-if="skills.length" class="flex flex-wrap gap-2">
              <span
                v-for="skill in skills"
                :key="skill"
                class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
              >
                {{ skill }}
              </span>
            </div>
            <p v-else class="text-sm text-slate-500">
              List your core skills to help recruiters scan your strengths
              quickly.
            </p>
          </section>

          <section class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="h-5 w-1 rounded-full bg-indigo-500"></span>
              <h3
                class="text-base font-semibold uppercase tracking-wide text-slate-800"
              >
                Education
              </h3>
            </div>
            <div v-if="education.length" class="space-y-4">
              <article
                v-for="school in education"
                :key="`${school.school}-${school.degree}`"
              >
                <div
                  class="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <div>
                    <p class="text-sm font-semibold">{{ school.school }}</p>
                    <p class="text-sm text-slate-700">{{ school.degree }}</p>
                  </div>
                  <p class="text-xs uppercase tracking-wide text-slate-500">
                    {{ school.startAndEndDate || "Add dates" }}
                  </p>
                </div>
                <p class="mt-1 text-sm text-slate-700">
                  {{
                    school.description ||
                    "Share relevant coursework or achievements."
                  }}
                </p>
              </article>
            </div>
            <p v-else class="text-sm text-slate-500">
              Add your education history to round out your profile.
            </p>
          </section>

          <section class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="h-5 w-1 rounded-full bg-indigo-500"></span>
              <h3
                class="text-base font-semibold uppercase tracking-wide text-slate-800"
              >
                Languages
              </h3>
            </div>
            <div v-if="languages.length" class="flex flex-wrap gap-2">
              <span
                v-for="language in languages"
                :key="language"
                class="rounded bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800"
              >
                {{ language }}
              </span>
            </div>
            <p v-else class="text-sm text-slate-500">
              Add languages to highlight how you collaborate across teams.
            </p>
          </section>
        </div>
      </div>

      <section class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="h-5 w-1 rounded-full bg-indigo-500"></span>
          <h3
            class="text-base font-semibold uppercase tracking-wide text-slate-800"
          >
            Projects
          </h3>
        </div>
        <div v-if="projects.length" class="grid gap-4 md:grid-cols-2">
          <article
            v-for="project in projects"
            :key="`${project.projectName}-${project.url}`"
            class="rounded-lg border border-slate-100 p-4 shadow-sm"
          >
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm font-semibold">{{ project.projectName }}</p>
              <p class="text-xs uppercase tracking-wide text-slate-500">
                {{ project.startAndEndDate || "Add dates" }}
              </p>
            </div>
            <p class="mt-1 text-sm text-slate-700">
              {{
                project.description ||
                "Describe your contribution and the outcome."
              }}
            </p>
            <a
              v-if="project.url"
              class="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-indigo-700"
              :href="project.url"
              target="_blank"
              rel="noreferrer"
            >
              View project
              <font-awesome-icon
                :icon="['fas', 'arrow-up-right-from-square']"
              />
            </a>
          </article>
        </div>
        <p v-else class="text-sm text-slate-500">
          Add projects to showcase measurable wins.
        </p>
      </section>
    </div>
  </div>
</template>
