<script setup lang="ts">
import { EDITOR_FIELDS, type EditorFieldSchema } from "@/types/builder";

interface SectionFormProps {
    fields: EditorFieldSchema[],
    modelValue: any
}

withDefaults(defineProps<SectionFormProps>(), {
    fields: () => [],
    modelValue: () => ({})
})

const emit = defineEmits(['update:modelValue'])
const formValues: Ref<any> = ref({})
const onFieldBlur = () => emit('update:modelValue', formValues.value)

</script>
<template>
    <div>
        do something with tailwind
    </div>
    <!-- <v-row>
        <v-col v-for="(field, idx) in  fields  " :key="idx" :cols="field?.cols">
            <v-text-field v-if="field.type === EDITOR_FIELDS.TEXT" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
            <v-text-field v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
            <client-only v-if="field.type === EDITOR_FIELDS.EDITOR">
                <content-editor v-model.trim="formValues[field.fieldName]" />
            </client-only>
        </v-col>
    </v-row> -->
</template>
