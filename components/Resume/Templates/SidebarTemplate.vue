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

const references = computed(
  () =>
    resume.value.references?.filter(
      (item) =>
        item?.referenceFullName || item?.company || item?.phone || item?.email,
    ) ?? [],
);

const socialLinks = computed(
  () =>
    resume.value.socialLinks?.filter((item) => item?.url || item?.label) ?? [],
);

const extraCurricular = computed(
  () =>
    resume.value.extraCurricularActivities?.filter(
      (item) =>
        item?.activityTitle || item?.description || item?.startAndEndDate,
    ) ?? [],
);
</script>

<template>
  <div
    class="grid h-full grid-cols-[200px_1fr] overflow-hidden rounded-lg bg-white text-slate-900 shadow-lg"
  >
    <aside class="flex flex-col gap-6 bg-slate-900 px-4 py-6 text-white">
      <div>
        <p class="text-lg font-bold leading-tight">
          {{ resume.firstName || "First" }}<br />
          {{ resume.lastName || "Last" }}
        </p>
        <p class="mt-1 text-xs uppercase tracking-wide text-indigo-200">
          {{ resume.jobTitle || "Role" }}
        </p>
      </div>

      <div class="space-y-2 text-sm text-slate-200">
        <p v-if="resume.email" class="flex items-center gap-2 break-all">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          {{ resume.email }}
        </p>
        <p v-if="resume.phoneNumber" class="flex items-center gap-2">
          <font-awesome-icon :icon="['fas', 'mobile-screen']" />
          {{ resume.phoneNumber }}
        </p>
        <p v-if="resume.city || resume.country" class="flex items-center gap-2">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          {{ [resume.city, resume.country].filter(Boolean).join(", ") }}
        </p>
      </div>

      <section>
        <h3 class="text-xs uppercase tracking-wide text-indigo-200">Links</h3>
        <div v-if="socialLinks.length" class="mt-2 space-y-1">
          <p
            v-for="link in socialLinks"
            :key="`${link.url}-${link.label}`"
            class="text-xs text-slate-200"
          >
            {{ link.label || "Profile" }} — {{ link.url }}
          </p>
        </div>
        <p v-else class="mt-1 text-xs text-slate-400">
          Add portfolio or social links for quick access.
        </p>
      </section>

      <section>
        <h3 class="text-xs uppercase tracking-wide text-indigo-200">
          References
        </h3>
        <div
          v-if="references.length"
          class="mt-2 space-y-2 text-xs text-slate-200"
        >
          <div
            v-for="ref in references"
            :key="`${ref.referenceFullName}-${ref.company}`"
          >
            <p class="font-semibold">{{ ref.referenceFullName }}</p>
            <p>{{ ref.company }}</p>
            <p class="text-slate-300">{{ ref.phone || ref.email }}</p>
          </div>
        </div>
        <p v-else class="mt-1 text-xs text-slate-400">
          Add references to strengthen your profile.
        </p>
      </section>
    </aside>

    <main class="flex flex-col gap-6 px-8 py-6">
      <section class="space-y-2">
        <h2
          class="text-base font-semibold uppercase tracking-wide text-slate-700"
        >
          Profile
        </h2>
        <p class="text-sm leading-relaxed text-slate-800">
          {{
            resume.professionalSummary ||
            "Summarize your background and what makes you stand out."
          }}
        </p>
      </section>

      <section class="space-y-2">
        <h2
          class="text-base font-semibold uppercase tracking-wide text-slate-700"
        >
          Highlights
        </h2>
        <ul class="list-disc space-y-1 ps-5 text-sm text-slate-800">
          <li v-if="resume.skills?.length">
            <strong>Skills:</strong>
            {{
              resume.skills
                ?.map((skill) => skill.skillName)
                .filter(Boolean)
                .join(", ")
            }}
          </li>
          <li v-if="resume.languages?.length">
            <strong>Languages:</strong>
            {{
              resume.languages
                ?.map((language) => language.language)
                .filter(Boolean)
                .join(", ")
            }}
          </li>
          <li v-if="resume.courses?.length">
            <strong>Courses:</strong>
            {{
              resume.courses
                ?.map((course) => course.courseName)
                .filter(Boolean)
                .join(", ")
            }}
          </li>
          <li
            v-if="
              !resume.skills?.length &&
              !resume.languages?.length &&
              !resume.courses?.length
            "
            class="text-slate-500"
          >
            Add skills, languages, and certifications to highlight your
            expertise.
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2
          class="text-base font-semibold uppercase tracking-wide text-slate-700"
        >
          Experience
        </h2>
        <div v-if="resume.employmentHistory?.length" class="space-y-4">
          <article
            v-for="job in resume.employmentHistory"
            :key="`${job.jobTitle}-${job.employer}-${job.startAndEndDate}`"
            class="rounded-lg border border-slate-100 p-4"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p class="text-sm font-semibold">
                  {{ job.jobTitle || "Role" }}
                </p>
                <p class="text-sm text-slate-700">
                  {{ job.employer || "Company" }}
                </p>
              </div>
              <p class="text-xs uppercase tracking-wide text-slate-500">
                {{ job.startAndEndDate || "Dates" }}
              </p>
            </div>
            <p class="mt-1 text-sm text-slate-700">
              {{
                job.description ||
                "Describe your responsibilities and achievements."
              }}
            </p>
          </article>
        </div>
        <p v-else class="text-sm text-slate-500">
          Add your work history to give this template more detail.
        </p>
      </section>

      <section class="space-y-2">
        <h2
          class="text-base font-semibold uppercase tracking-wide text-slate-700"
        >
          Activities
        </h2>
        <div v-if="extraCurricular.length" class="space-y-3">
          <article
            v-for="activity in extraCurricular"
            :key="`${activity.activityTitle}-${activity.startAndEndDate}`"
            class="rounded-lg border border-slate-100 p-3"
          >
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm font-semibold">
                {{ activity.activityTitle || "Activity" }}
              </p>
              <p class="text-xs uppercase tracking-wide text-slate-500">
                {{ activity.startAndEndDate || "Dates" }}
              </p>
            </div>
            <p class="text-sm text-slate-700">
              {{
                activity.description ||
                "Describe your involvement and outcomes."
              }}
            </p>
          </article>
        </div>
        <p v-else class="text-sm text-slate-500">
          Add volunteer or extra-curricular experience to show your versatility.
        </p>
      </section>
    </main>
  </div>
</template>
