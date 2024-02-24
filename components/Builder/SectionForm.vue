<script setup lang="ts">
import {EDITOR_FIELDS, type EditorFieldSchema} from "@/types/builder";

interface SectionFormProps {
  fields: EditorFieldSchema[]
}

withDefaults(defineProps<SectionFormProps>(), {
  fields: () => []
})
</script>
<template>
  <v-row>
    <v-col
      v-for="(field, idx) in fields"
      :key="idx"
      :cols="field?.cols"
    >
      <v-text-field
        v-if="field.type === EDITOR_FIELDS.TEXT"
        :label="field?.title"
      />
      <v-text-field
        v-if="field.type === EDITOR_FIELDS.START_AND_END_DATE"
        :label="field?.title"
      />
      <client-only v-if="field.type === EDITOR_FIELDS.EDITOR">
        <content-editor />
      </client-only>
    </v-col>
  </v-row>
</template>