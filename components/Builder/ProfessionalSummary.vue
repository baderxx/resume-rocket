<script lang="ts" setup>
const htmlContent = ref("<p>Some cool content</p>");

const sectionTitle = computed(() => {
  return "Professional Summary";
});

const sectionSubtitle = computed(() => {
  return "Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.\n";
});
</script>

<template>
  <div>
    <builder-section-header
      :title="sectionTitle"
      :sub-title="sectionSubtitle"
      class="mb-3"
    />
    <client-only>
      <content-editor v-model="htmlContent" />
    </client-only>
  </div>
</template>
