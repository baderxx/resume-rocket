<script setup lang="ts">
import { EDITOR_FIELDS, type EditorFieldSchema } from "@/types/builder";

interface SectionFormProps {
  fields: EditorFieldSchema[];
  modelValue: any;
}

withDefaults(defineProps<SectionFormProps>(), {
  fields: () => [],
  modelValue: () => ({}),
});

const emit = defineEmits(["update:modelValue"]);
const formValues: Ref<any> = ref({});
const onFieldBlur = () => emit("update:modelValue", formValues.value);
</script>
<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <template v-for="(field, idx) in fields" :key="idx">
        <div>
          <form-text-field
            v-if="field.type === EDITOR_FIELDS.TEXT"
            v-model="formValues[field.fieldName]"
            :label="field?.title"
            @blur="onFieldBlur"
          />
          <form-text-field
            v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE"
            v-model="formValues[field.fieldName]"
            :label="field?.title"
            @blur="onFieldBlur"
          />
        </div>
        <client-only v-if="field.type === EDITOR_FIELDS.EDITOR">
          <div class="col-span-2">
            <content-editor v-model.trim="formValues[field.fieldName]" />
          </div>
        </client-only>
      </template>
    </div>
  </div>
  <!-- <v-row>
        <v-col  :cols="field?.cols">
            <v-text-field v-if="field.type === EDITOR_FIELDS.TEXT" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
            <v-text-field v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
           
        </v-col>
    </v-row> -->
</template>
