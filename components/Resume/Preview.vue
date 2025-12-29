<script lang="ts" setup>
import { computed, ref, type Component } from "vue";
import TemplateSelector from "@/components/Resume/TemplateSelector.vue";
import ClassicTemplate from "@/components/Resume/Templates/ClassicTemplate.vue";
import SidebarTemplate from "@/components/Resume/Templates/SidebarTemplate.vue";
import {
  useResumeInformation,
  type DeepPartial,
  type ResumeInformation,
} from "@/composables/useResumeInformation";

type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  component: Component;
  mockData: DeepPartial<ResumeInformation>;
};

const mockClassicResume: DeepPartial<ResumeInformation> = {
  firstName: "Jordan",
  lastName: "Rivera",
  jobTitle: "Product Designer",
  email: "jordan.rivera@email.com",
  phoneNumber: "+1 (555) 123-4567",
  city: "Remote",
  country: "USA",
  professionalSummary:
    "Product designer with 6+ years leading cross-functional teams to ship inclusive, user-focused experiences.",
  employmentHistory: [
    {
      jobTitle: "Senior Product Designer",
      employer: "Northwind Labs",
      startAndEndDate: "2020 — Present",
      city: "Remote",
      description:
        "Leading design system adoption and mentoring designers across squads.",
    },
    {
      jobTitle: "Product Designer",
      employer: "Globex",
      startAndEndDate: "2017 — 2020",
      city: "Austin, TX",
      description:
        "Shipped mobile-first experiences that improved activation by 15%.",
    },
  ],
  education: [
    {
      school: "University of Washington",
      degree: "B.A. Human Centered Design",
      startAndEndDate: "2013 — 2017",
      city: "Seattle, WA",
      description: "Specialized in product strategy and research methods.",
    },
  ],
  projects: [
    {
      projectName: "Design System Refresh",
      startAndEndDate: "2023",
      description:
        "Defined tokens and accessibility patterns adopted across 4 product lines.",
      url: "https://northwindlabs.example/design-system",
    },
    {
      projectName: "Onboarding Simplification",
      startAndEndDate: "2022",
      description: "Streamlined onboarding, trimming time-to-value by 22%.",
    },
  ],
  skills: [
    { skillName: "Design Systems" },
    { skillName: "Prototyping" },
    { skillName: "User Research" },
    { skillName: "Collaboration" },
  ],
  languages: [{ language: "English" }, { language: "Spanish" }],
};

const mockSidebarResume: DeepPartial<ResumeInformation> = {
  firstName: "Alex",
  lastName: "Nguyen",
  jobTitle: "Full Stack Developer",
  email: "alex.nguyen@example.com",
  phoneNumber: "+44 20 1234 5678",
  city: "London",
  country: "UK",
  professionalSummary:
    "Developer focused on resilient, scalable web applications with a passion for DX.",
  employmentHistory: [
    {
      jobTitle: "Senior Engineer",
      employer: "Contoso",
      startAndEndDate: "2021 — Present",
      description:
        "Building platform tooling and performance improvements for core products.",
    },
    {
      jobTitle: "Software Engineer",
      employer: "Fabrikam",
      startAndEndDate: "2018 — 2021",
      description:
        "Led migration to modern front-end stack and improved test reliability.",
    },
  ],
  skills: [
    { skillName: "TypeScript" },
    { skillName: "Node.js" },
    { skillName: "System Design" },
    { skillName: "Testing" },
  ],
  languages: [{ language: "English" }, { language: "Vietnamese" }],
  courses: [{ courseName: "AWS Certified Developer" }],
  socialLinks: [
    { label: "Portfolio", url: "alexnguyen.dev" },
    { label: "GitHub", url: "github.com/alexnguyen" },
  ],
  references: [
    {
      referenceFullName: "Sana Patel",
      company: "Contoso",
      phone: "+44 20 1234 9999",
    },
  ],
  extraCurricularActivities: [
    {
      activityTitle: "Tech Speaker",
      startAndEndDate: "2022 — Present",
      description: "Talks on accessibility and testing at local meetups.",
    },
  ],
};

const templateDefinitions: TemplateDefinition[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean, professional layout great for most roles.",
    component: ClassicTemplate,
    mockData: mockClassicResume,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Bold sidebar for quick-scanning contact details.",
    component: SidebarTemplate,
    mockData: mockSidebarResume,
  },
];

const { resumeData } = useResumeInformation();
const selectedTemplateId = ref(templateDefinitions[0]?.id);

const selectedTemplate = computed(() =>
  templateDefinitions.find(
    (template) => template.id === selectedTemplateId.value,
  ),
);

function hasNonEmptyString(value?: string) {
  return Boolean(value && value.toString().trim().length);
}

function arrayHasContent<T extends Record<string, any>>(
  items: T[] | undefined,
  keys: (keyof T)[],
) {
  return (
    items?.some((item) =>
      keys.some((key) => hasNonEmptyString(item?.[key] as string)),
    ) ?? false
  );
}

const hasResumeContent = computed(() => {
  const baseFields = [
    resumeData.value.firstName,
    resumeData.value.lastName,
    resumeData.value.jobTitle,
    resumeData.value.professionalSummary,
    resumeData.value.email,
    resumeData.value.phoneNumber,
  ];

  const hasBaseField = baseFields.some(hasNonEmptyString);
  const hasArrayField =
    arrayHasContent(resumeData.value.employmentHistory, [
      "jobTitle",
      "employer",
      "description",
    ]) ||
    arrayHasContent(resumeData.value.education, ["school", "degree"]) ||
    arrayHasContent(resumeData.value.projects, [
      "projectName",
      "description",
    ]) ||
    arrayHasContent(resumeData.value.skills, ["skillName"]) ||
    arrayHasContent(resumeData.value.languages, ["language"]);

  return hasBaseField || hasArrayField;
});

const activeResume = computed(
  () =>
    (hasResumeContent.value
      ? resumeData.value
      : selectedTemplate.value?.mockData) ?? mockClassicResume,
);
</script>

<template>
  <div class="space-y-5">
    <TemplateSelector
      :templates="templateDefinitions"
      v-model:selectedTemplateId="selectedTemplateId"
    />

    <div class="grid place-content-center">
      <div
        class="resume-preview select-none overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xl"
      >
        <component
          v-if="selectedTemplate"
          :is="selectedTemplate.component"
          :resume="activeResume"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-slate-900/80 px-6 text-center text-white"
        >
          <div>
            <p class="text-lg font-semibold">
              Choose a template to start your preview
            </p>
            <p class="text-sm text-slate-200">
              Pick a template from the gallery above to see your resume layout.
            </p>
          </div>
        </div>
      </div>
      <p
        v-if="!hasResumeContent"
        class="mt-3 text-center text-sm text-slate-200"
      >
        Showing sample data for preview. Add your information to replace these
        examples.
      </p>
    </div>
  </div>
</template>

<style scoped>
.resume-preview {
  height: 842px;
  width: 592px;
}
</style>
