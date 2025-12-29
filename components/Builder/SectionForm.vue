<script setup lang="ts">
import { onMounted, watch } from "vue";
import type { Ref } from "vue";

import { EDITOR_FIELDS, type EditorFieldSchema } from "@/types/builder";

interface SectionFormProps {
  fields: EditorFieldSchema[];
  modelValue: any;
}

const props = withDefaults(defineProps<SectionFormProps>(), {
  fields: () => [],
  modelValue: () => ({}),
});

const emit = defineEmits(["update:modelValue", "submit"]);
const formValues: Ref<Record<string, any>> = ref({});
const errors: Ref<Record<string, string | null>> = ref({});

const emitUpdate = () => {
  emit("update:modelValue", { ...formValues.value });
};

const validateField = (field: EditorFieldSchema) => {
  const rules = field.rules || [];
  const result = rules
    .map((rule) => rule(formValues.value[field.fieldName]))
    .find((validationResult) => validationResult !== true);

  errors.value[field.fieldName] =
    result && typeof result === "string" ? result : null;

  return !errors.value[field.fieldName];
};

const validateAll = () => {
  return props.fields.map((field) => validateField(field)).every(Boolean);
};

const onFieldBlur = (field: EditorFieldSchema) => {
  validateField(field);
  emitUpdate();
};

const onSubmit = () => {
  const isValid = validateAll();
  emitUpdate();
  emit("submit", { valid: isValid, values: { ...formValues.value } });
  return isValid;
};

const initializeFormValues = () => {
  const initialValues = props.fields.reduce((acc, field) => {
    acc[field.fieldName] =
      props.modelValue?.[field.fieldName] ?? field.value ?? "";
    return acc;
  }, {} as Record<string, any>);

  formValues.value = initialValues;
};

watch(
  () => props.modelValue,
  (newValue) => {
    formValues.value = { ...formValues.value, ...newValue };
  },
  { deep: true },
);

onMounted(() => {
  initializeFormValues();
  emitUpdate();
});

defineExpose({
  validate: onSubmit,
  validateField,
});
</script>
<template>
  <form @submit.prevent="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <template v-for="(field, idx) in fields" :key="idx">
        <div>
          <form-text-field
            v-if="field.type === EDITOR_FIELDS.TEXT"
            v-model="formValues[field.fieldName]"
            :error="!!errors[field.fieldName]"
            :error-message="errors[field.fieldName] || undefined"
            :label="field?.title"
            @blur="onFieldBlur(field)"
          />
          <form-text-field
            v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE"
            v-model="formValues[field.fieldName]"
            :error="!!errors[field.fieldName]"
            :error-message="errors[field.fieldName] || undefined"
            :label="field?.title"
            @blur="onFieldBlur(field)"
          />
        </div>
        <client-only v-if="field.type === EDITOR_FIELDS.EDITOR">
          <div class="col-span-2" @focusout="onFieldBlur(field)">
            <content-editor v-model.trim="formValues[field.fieldName]" />
            <p
              v-if="errors[field.fieldName]"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors[field.fieldName] }}
            </p>
          </div>
        </client-only>
      </template>
    </div>
  </form>
  <!-- <v-row>
        <v-col  :cols="field?.cols">
            <v-text-field v-if="field.type === EDITOR_FIELDS.TEXT" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
            <v-text-field v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE" v-model.trim="formValues[field.fieldName]"
                :label="field?.title" @blur="onFieldBlur" />
           
        </v-col>
    </v-row> -->
</template>
