<script setup lang="ts">
import {
  createDefaultSectionItem,
  useResumeInformation,
} from "@/composables/useResumeInformation";
import type {
  EditorFieldSchema,
  SectionItemTitleTemplate,
} from "@/types/builder";
import { SectionTypes } from "~/types/enums";
const { resumeData } = useResumeInformation();

type SectionItems = {
  fields: EditorFieldSchema[];
};

const sectionTitle = defineModel("sectionTitle");
const sectionItems: Ref<SectionItems[]> = ref([]);

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

const getCompiledSectionTitle = computed(() => (index: number) => {
  // #TODO: fix the item type its not properly infering from defined props type
  return props.itemTitleTemplate
    .map((item: any) => {
      if (item.fieldName)
        return (
          resumeData.value[props.sectionDataKey]?.[index]?.[item.fieldName] ||
          "(Not Specified)"
        );
      if (item.text) return item.text;
    })
    .join(" ");
});

const onAddNewSectionItem = async () => {
  if (!resumeData.value[props.sectionDataKey]) {
    resumeData.value[props.sectionDataKey] = [];
  }
  const defaultItem = createDefaultSectionItem(
    (props.sectionType || props.sectionDataKey) as SectionTypes,
  );
  (resumeData.value[props.sectionDataKey] as unknown[]).push(defaultItem);
  sectionItems.value.push({ fields: props.formTemplate });
};
</script>
<template>
  <div class="mt-5">
    <builder-section-header
      v-model:title="sectionTitle"
      :sub-title="sectionSubtitle"
    />

    <!--  #TODO: move this to a component and get the skill data from api -->
    <div v-if="sectionType === SectionTypes.SKILLS" class="mt-4">
      <button
        v-for="(skill, idx) in [
          'Java',
          'JavaScript',
          'Vue.js',
          'React.js',
          'Nuxt.js',
          'Next.js',
        ]"
        :key="idx"
        class="mb-3 me-2 rounded bg-[#eff2f9] px-3.5 py-1 hover:bg-[#eaf6ff] hover:text-[#1a91f0]"
      >
        <span class="text-base">{{ skill }}</span>
        <font-awesome-icon class="ml-1.5" :icon="['fas', 'plus']" />
      </button>
    </div>
    <expansion-panel
      v-for="(sectionItem, index) in sectionItems"
      :key="index"
      class="mt-3 rounded border px-5 py-3.5 pb-5"
    >
      <template #activator="{ click }">
        <div class="group grid grid-rows-2" role="button" @click="click">
          <span class="text-sm font-bold group-hover:text-[#1a91f0]">{{
            getCompiledSectionTitle(index)
          }}</span>
          <span class="mt-1 text-sm font-thin">Oct 2020 - Present</span>
        </div>
      </template>
      <template #content>
        <builder-section-form
          v-model="resumeData[sectionDataKey][index]"
          :fields="sectionItem.fields"
          class="mt-3"
        />
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
