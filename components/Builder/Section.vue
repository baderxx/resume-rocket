<script setup lang="ts">
import type { EditorFieldSchema } from "@/types/builder";
import { EDITOR_FIELDS } from "@/types/builder";

type ExperienceItems = {
  fields: EditorFieldSchema[]
}

const experiences = ref([])
const experienceItems: Ref<ExperienceItems[]> = ref([])

// const sectionTitle = computed(() => {
//   return 'Employment History'
// })
//
// const sectionSubtitle = computed(() => {
//   return 'Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).'
// })

type SectionProps = {
  sectionTitle: string,
  sectionSubtitle: string,
  formTemplate: EditorFieldSchema[]
}
withDefaults(defineProps<SectionProps>(), {
  sectionTitle: '',
  sectionSubtitle: '',
  formTemplate: () => []
})

const experienceFormTemplate = computed<EditorFieldSchema[]>(() => {
  return [
    {
      title: 'Job Title',
      type: EDITOR_FIELDS.TEXT,
      value: '',
      cols: 6
    },
    {
      title: 'Employer',
      type: EDITOR_FIELDS.TEXT,
      value: '',
      cols: 6
    },
    {
      title: 'Start & End Date',
      type: EDITOR_FIELDS.START_AND_END_DATE,
      value: '',
      cols: 6
    },
    {
      title: 'City',
      type: EDITOR_FIELDS.TEXT,
      value: '',
      cols: 6
    },
    {
      title: 'Description',
      type: EDITOR_FIELDS.EDITOR,
      value: '',
      cols: 12
    }
  ]
})

const onAddNewSection = () => {
  experienceItems.value.push({fields: experienceFormTemplate.value})
}

onMounted(() => {
  experienceItems.value.push({fields: experienceFormTemplate.value})
})

</script>
<template>
  <div class="mt-5">
    <builder-section-header
      :title="sectionTitle"
      :sub-title="sectionSubtitle"
      add-action-text="Add more experience"
      @add="onAddNewSection"
    />

    <v-expansion-panels v-model="experiences">
      <v-expansion-panel
        v-for="(experienceSection, index) in experienceItems"
        :key="index"
      >
        <v-expansion-panel-title>
          <div class="d-flex flex-column">
            <span>Senior Frontend Engineer at Digital Dubai</span>
            <span class="mt-2">Oct 2020 - Present</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <builder-section-form
            :fields="experienceSection.fields"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 10px 0;
}
</style>