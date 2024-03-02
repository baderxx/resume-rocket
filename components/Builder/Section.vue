<script setup lang="ts">
import { useResumeInformation } from "@/composables/useResumeInformation";
import type {
  EditorFieldSchema,
  SectionItemTitleTemplate,
} from "@/types/builder";
const { resumeData } = useResumeInformation();

type SectionItems = {
  fields: EditorFieldSchema[];
};

const sectionItems: Ref<SectionItems[]> = ref([]);

type SectionProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  addActionText: string;
  sectionDataKey: string;
  itemTitleTemplate: SectionItemTitleTemplate[];
  formTemplate: EditorFieldSchema[];
};

const props = withDefaults(defineProps<Partial<SectionProps>>(), {
  sectionTitle: "",
  sectionSubtitle: "",
  addActionText: "",
  sectionDataKey: "",
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
  sectionItems.value.push({ fields: props.formTemplate });
};
</script>
<template>
  <div class="mt-5">
    <builder-section-header
      :title="sectionTitle"
      :sub-title="sectionSubtitle"
    />
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
