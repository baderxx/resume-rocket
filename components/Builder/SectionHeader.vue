<script lang="ts" setup>
type SectionHeaderProps = {
  subTitle: string;
};

const title = defineModel("title");

const titleElement = ref<HTMLElement | null>(null);
const isEditing = ref(false);

const onEditTitle = async () => {
  isEditing.value = true;
  await nextTick(() => {
    titleElement.value?.focus();
  });
};

const onTitleSave = (e: Event) => {
  const element = e.target as HTMLElement;
  title.value = element.innerText;
  element.blur();
  isEditing.value = false;
};

withDefaults(defineProps<Partial<SectionHeaderProps>>(), {
  subTitle: "",
});
</script>

<template>
  <div class="grid grid-cols-1">
    <div>
      <div class="group flex items-center">
        <div
          ref="titleElement"
          class="mb-2 text-xl focus:rounded-b-none focus:border-b-2 focus:border-blue-600 focus:outline-none"
          :contenteditable="isEditing"
          @keydown.enter.prevent="onTitleSave"
        >
          {{ title }}
        </div>
        <div
          class="invisible mb-2 ms-2 text-sm hover:cursor-pointer hover:text-blue-300 group-hover:visible"
        >
          <font-awesome-icon
            class="text-gray-400"
            :icon="['fas', 'pencil']"
            @click="onEditTitle"
          />
        </div>
      </div>
      <p class="mb-2 text-sm font-thin">{{ subTitle }}</p>
    </div>
  </div>
</template>
