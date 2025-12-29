<script setup lang="ts">
import { computed, ref, type Ref } from "vue";

import {
  createDefaultSectionItem,
  useResumeInformation,
} from "@/composables/useResumeInformation";
import type {
  EditorFieldSchema,
  SectionItemTitleTemplate,
} from "@/types/builder";
import type { ResumeInformation } from "@/types/resumeData";
import { SectionTypes } from "~/types/enums";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type ResumeCollectionKey =
  | "employmentHistory"
  | "projects"
  | "education"
  | "socialLinks"
  | "skills"
  | "languages"
  | "courses"
  | "hobbies"
  | "extraCurricularActivities"
  | "references";

type ResumeCollectionValue = Array<Record<string, unknown>>;

const { resumeData } = useResumeInformation();
const resumeDataRecord = resumeData as Ref<DeepPartial<ResumeInformation>>;

const sectionTitle = defineModel("sectionTitle");

type SectionProps = {
  sectionSubtitle: string;
  addActionText: string;
  sectionDataKey: string;
  sectionType?: string;
  itemTitleTemplate: SectionItemTitleTemplate[];
  formTemplate: EditorFieldSchema[];
};

const props = withDefaults(defineProps<Partial<SectionProps>>(), {
  sectionSubtitle: "",
  addActionText: "",
  sectionDataKey: "",
  sectionType: "section",
  itemTitleTemplate: () => [],
  formTemplate: () => [],
});

const sectionDataKeyTyped = computed<ResumeCollectionKey>(
  () => props.sectionDataKey as ResumeCollectionKey,
);

const sectionArray = computed(() => {
  const key = sectionDataKeyTyped.value;
  const existing = resumeDataRecord.value[key];

  if (!Array.isArray(existing)) {
    resumeDataRecord.value[key] =
      [] as DeepPartial<ResumeInformation>[typeof key];
  }

  return (resumeDataRecord.value[key] as ResumeCollectionValue) ?? [];
});

const getCompiledSectionTitle = computed(() => (index: number) => {
  // #TODO: fix the item type its not properly infering from defined props type
  const entry = sectionArray.value[index];

  return props.itemTitleTemplate
    .map((item: any) => {
      if (item.fieldName)
        return (
          (entry?.[item.fieldName] as string | undefined) || "(Not Specified)"
        );
      if (item.text) return item.text;
      return "";
    })
    .join(" ");
});

const formatDateRange = (range: unknown) => {
  if (!range || typeof range !== "object") return "";
  const { startDate, endDate } = range as Record<string, string>;
  if (!startDate && !endDate) return "";
  return [startDate, endDate || "Present"].filter(Boolean).join(" - ");
};

const getDateRangeForSectionItem = computed(() => (index: number) => {
  const entry = sectionArray.value[index] as Record<string, unknown>;
  return formatDateRange(entry?.startAndEndDate);
});

const onAddNewSectionItem = async () => {
  const defaultItem = createDefaultSectionItem(
    (props.sectionType || props.sectionDataKey) as SectionTypes,
  );
  sectionArray.value.push(defaultItem);
};

const onRemoveSectionItem = (index: number) => {
  sectionArray.value.splice(index, 1);
};

const skillSearchTerm = ref("");
const skillSuggestions = [
  "Java",
  "JavaScript",
  "Vue.js",
  "React.js",
  "Nuxt.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Docker",
];

const filteredSkillSuggestions = computed(() => {
  if (!skillSearchTerm.value.trim()) return skillSuggestions;
  return skillSuggestions.filter((skill) =>
    skill.toLowerCase().includes(skillSearchTerm.value.trim().toLowerCase()),
  );
});

const addSkillToResume = (skillName: string) => {
  const normalizedSkill = skillName.trim();
  if (!normalizedSkill) return;

  const skillsArray = sectionArray.value as ResumeCollectionValue;
  const alreadyExists = skillsArray.some(
    (skill) =>
      typeof skill?.skillName === "string" &&
      skill.skillName.toLowerCase() === normalizedSkill.toLowerCase(),
  );

  if (alreadyExists) {
    skillSearchTerm.value = "";
    return;
  }

  skillsArray.push({
    skillName: normalizedSkill,
    expertiseLevel: 3,
  });
  skillSearchTerm.value = "";
};

const removeSkill = (index: number) => {
  sectionArray.value.splice(index, 1);
};

const handleSkillEnter = (event: Event) => {
  event.preventDefault();
  addSkillToResume(skillSearchTerm.value);
};
</script>
<template>
  <div class="mt-5">
    <builder-section-header
      v-model:title="sectionTitle"
      :sub-title="sectionSubtitle"
    />

    <div v-if="sectionType === SectionTypes.SKILLS" class="mt-4 space-y-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-normal text-indigo-900">Search skills</label>
        <form class="flex gap-2" @submit.prevent="handleSkillEnter">
          <input
            v-model="skillSearchTerm"
            type="text"
            placeholder="Start typing to search or add a skill"
            class="min-h-12 w-full rounded bg-[#eff2f9] p-2 focus:rounded-b-none focus:border-b-2 focus:border-blue-600 focus:outline-none"
          />
          <button
            class="rounded bg-[#1a91f0] px-3.5 py-2 text-sm font-bold text-white hover:bg-[#1474c2]"
            type="submit"
          >
            Add
          </button>
        </form>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(skill, idx) in filteredSkillSuggestions"
            :key="idx"
            class="rounded bg-[#eff2f9] px-3.5 py-1 text-sm text-indigo-900 transition hover:bg-[#eaf6ff] hover:text-[#1a91f0]"
            type="button"
            @click="addSkillToResume(skill)"
          >
            {{ skill }}
          </button>
        </div>
      </div>

      <div v-if="sectionArray.length" class="flex flex-wrap gap-2">
        <div
          v-for="(skill, skillIndex) in sectionArray"
          :key="`${skillIndex}-${skill.skillName}`"
          class="flex items-center gap-1 rounded-full bg-[#e0e7ff] px-3 py-1 text-sm text-indigo-900"
        >
          <span>{{ skill?.skillName || "Skill" }}</span>
          <button
            aria-label="Remove skill"
            class="text-indigo-700 hover:text-indigo-900"
            type="button"
            @click.stop="removeSkill(skillIndex)"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
    <expansion-panel
      v-for="(sectionItem, index) in sectionArray"
      :key="index"
      class="mt-3 rounded border px-5 py-3.5 pb-5"
    >
      <template #activator="{ click }">
        <div class="group grid grid-rows-2" role="button" @click="click">
          <span class="text-sm font-bold group-hover:text-[#1a91f0]">{{
            getCompiledSectionTitle(index)
          }}</span>
          <span class="mt-1 text-sm font-thin">{{
            getDateRangeForSectionItem(index) || "Add dates"
          }}</span>
        </div>
      </template>
      <template #content>
        <builder-section-form
          v-model="sectionArray[index]"
          :fields="formTemplate"
          class="mt-3"
        />
        <div class="mt-3 flex justify-end">
          <button
            class="text-sm font-semibold text-red-600 hover:text-red-700"
            type="button"
            @click.stop="onRemoveSectionItem(index)"
          >
            Delete item
          </button>
        </div>
      </template>
    </expansion-panel>
    <button
      class="w-full rounded px-3.5 py-1.5 text-start text-sm font-bold text-[#1a91f0] hover:bg-[#eaf6ff80]"
      @click="onAddNewSectionItem"
    >
      <!-- #TODO: add icon -->
      + {{ addActionText }}
    </button>
  </div>
</template>
<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 10px 0;
}
</style>
