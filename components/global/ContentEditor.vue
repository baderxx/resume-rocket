<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";

import { Editor, EditorContent } from "@tiptap/vue-3";

type ContentEditorProps = {
  modelValue: string;
};

const props = withDefaults(defineProps<ContentEditorProps>(), {
  modelValue: "",
});
const emit = defineEmits(["update:modelValue"]);

const editor: Ref<Editor | undefined> = ref();

// Methods

const registerEditor = () => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "ms-4 list-decimal list-outside",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "ms-4 list-disc list-outside",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "underline text-indigo-500",
        },
      }),
    ],
    content: props.modelValue,
    onUpdate: () => {
      emit("update:modelValue", editor.value?.getHTML());
    },
  });
};

const onToggleBold = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleBold().run();
};

const onToggleItalic = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleItalic().run();
};

const onToggleStrike = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleStrike().run();
};

const onToggleUnderline = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleUnderline().run();
};

const onToggleBulletList = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleBulletList().run();
};

const onToggleOrderedList = () => {
  if (!editor.value) return;
  editor.value.chain().focus().toggleOrderedList().run();
};

const onToggleLink = () => {
  if (!editor.value) return;

  const previousLink = editor.value.getAttributes("link").href;
  // #TODO: implement a link modal
  // #TODO: fix behavior for active link

  const url: string | null = window.prompt("URL", previousLink);
  if (url === null) {
    return;
  }

  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};

// Computed
const isFormatToggled = computed(() => (format: string) => {
  return editor.value?.isActive(format);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!editor.value) return;

    const isSameValue = editor.value.getHTML() === newValue;
    if (isSameValue) return;

    editor.value.commands.setContent(newValue, false);
  },
);

onMounted(() => {
  registerEditor();
});

onBeforeUnmount(() => {
  editor.value!.destroy();
});
</script>
<template>
  <div class="editor">
    <div class="flex">
      <div class="divide-x-[1px]">
        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('bold') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleBold"
        >
          <font-awesome-icon :icon="['fas', 'bold']" />
        </span>
        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('italic') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleItalic"
        >
          <font-awesome-icon :icon="['fas', 'italic']" />
        </span>

        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('underline') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleUnderline"
        >
          <font-awesome-icon :icon="['fas', 'underline']" />
        </span>

        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('strike') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleStrike"
        >
          <font-awesome-icon :icon="['fas', 'strikethrough']" />
        </span>

        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('bulletList') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleBulletList"
        >
          <font-awesome-icon :icon="['fas', 'list-dots']" />
        </span>
      </div>
      <div class="divide-x-[1px]">
        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('orderedList') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleOrderedList"
        >
          <font-awesome-icon :icon="['fas', 'list-numeric']" />
        </span>

        <span
          :class="{ 'rounded-sm bg-[#e0e0e0]': isFormatToggled('link') }"
          class="shrink-0 flex-grow-0 p-1.5"
          @click="onToggleLink"
        >
          <font-awesome-icon :icon="['fas', 'link']" />
        </span>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 180px;
  padding: 10px;
  border-radius: 4px;
  background: rgb(239, 242, 249);

  :deep(.tiptap) {
    width: 100%;
    height: 145px;
    font-size: 14px;
    margin: 0 !important;
    box-sizing: content-box;
    border: unset;
    padding: 5px;

    &:focus-within {
      outline: none;
    }
  }
}
</style>
