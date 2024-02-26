<script setup lang="ts">
import type { EditorFieldSchema, SectionItemTitleTemplate } from "@/types/builder";
import { useResumeInformation } from '@/composables/useResumeInformation'
const { resumeData } = useResumeInformation()

type SectionItems = {
    fields: EditorFieldSchema[]
}

const sectionTabs = ref([])
const sectionItems: Ref<SectionItems[]> = ref([])

type SectionProps = {
    sectionTitle: string,
    sectionSubtitle: string,
    addActionText: string,
    sectionDataKey: string,
    itemTitleTemplate: SectionItemTitleTemplate[],
    formTemplate: EditorFieldSchema[]
}

const props = withDefaults(defineProps<SectionProps>(), {
    sectionTitle: '',
    sectionSubtitle: '',
    addActionText: '',
    sectionDataKey: '',
    itemTitleTemplate: () => [],
    formTemplate: () => []
})

const getCompiledSectionTitle = computed(() => (index: number) => {
    // #TODO: fix the item type its not properly infering from defined props type
    return props.itemTitleTemplate.map((item: any) => {
        if (item.fieldName) return resumeData.value[props.sectionDataKey][index][item.fieldName]
        if (item.text) return item.text
    }).join(' ')
})

const onAddNewSectionItem = async () => {
    if (!resumeData.value[props.sectionDataKey]) resumeData.value[props.sectionDataKey] = []
    sectionItems.value.push({ fields: props.formTemplate })
}

</script>
<template>
    <div class="mt-5">
        <builder-section-header :title="sectionTitle" :sub-title="sectionSubtitle" :add-action-text="addActionText"
            @add="onAddNewSectionItem" />

        <!-- <v-expansion-panels v-model="sectionTabs">
            <v-expansion-panel v-for="(sectionItem, index) in sectionItems" :key="index">
                <v-expansion-panel-title>
                    <div class="d-flex flex-column">
                        <span>{{ getCompiledSectionTitle(index) }}</span>
                        <span class="mt-2">Oct 2020 - Present</span>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <builder-section-form :fields="sectionItem.fields" v-model=resumeData[sectionDataKey][index] />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels> -->
    </div>
</template>
<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
    padding: 10px 0;
}
</style>
