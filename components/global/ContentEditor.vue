<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Link from '@tiptap/extension-link'

import { Editor, EditorContent } from '@tiptap/vue-3'

type ContentEditorProps = {
    modelValue: string
}

const props = withDefaults(defineProps<ContentEditorProps>(), {
    modelValue: ''
})
const emit = defineEmits(['update:modelValue'])

const editor: Ref<Editor | undefined> = ref()

// Methods

const registerEditor = () => {
    editor.value = new Editor({
        extensions: [StarterKit, Underline, BulletList, ListItem, OrderedList, Link.configure({
            openOnClick: false,
        })],
        content: props.modelValue,
        onUpdate: () => {
            emit('update:modelValue', editor.value?.getHTML())
        },
    })
}

const onToggleBold = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleBold().run()
}

const onToggleItalic = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleItalic().run()
}

const onToggleStrike = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleStrike().run()
}

const onToggleUnderline = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleUnderline().run()
}

const onToggleBulletList = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleBulletList().run()
}

const onToggleOrderedList = () => {
    if (!editor.value) return
    editor.value.chain().focus().toggleOrderedList().run()
}

const onToggleLink = () => {
    if (!editor.value) return

    const previousLink = editor.value.getAttributes('link').href
    // #TODO: implement a link modal
    // #TODO: fix behavior for active link

    const url: string | null = window.prompt('URL', previousLink)
    if (url === null) {
        return
    }

    if (url === '') {
        editor.value
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
    }

    editor.value
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()

}

// Computed
const isFormatToggled = computed(() => (format: string) => {
    return editor.value?.isActive(format)
})


watch(() => props.modelValue, (newValue) => {
    if (!editor.value) return

    const isSameValue = editor.value.getHTML() === newValue
    if (isSameValue) return

    editor.value.commands.setContent(newValue, false)
})

onMounted(() => {
    registerEditor()
})

onBeforeUnmount(() => {
    editor.value!.destroy()
})
</script>
<template>
    <div class="editor">
        <div class="d-flex">
            toolbar
            <!-- <v-icon
        icon="mdi-format-bold"
        :class="{'is-active': isFormatToggled('bold')}"
        @click="onToggleBold"
      />
      <v-icon
        icon="mdi-format-italic"
        :class="{'is-active': isFormatToggled('italic')}"
        @click="onToggleItalic"
      />
      <v-icon
        icon="mdi-format-underline"
        :class="{'is-active': isFormatToggled('underline')}"
        @click="onToggleUnderline"
      />
      <v-icon
        icon="mdi-format-strikethrough-variant"
        :class="{'is-active': isFormatToggled('strike')}"
        @click="onToggleStrike"
      />
      <v-divider
        :vertical="true"
        class="mx-2"
      />
      <v-icon
        icon="mdi-format-list-bulleted"
        :class="{'is-active': isFormatToggled('bulletList')}"
        @click="onToggleBulletList"
      />
      <v-icon
        icon="mdi-format-list-numbered"
        :class="{'is-active': isFormatToggled('orderedList')}"
        @click="onToggleOrderedList"
      />
      <v-divider
        :vertical="true"
        class="mx-2"
      />
      <v-icon
        icon="mdi-link"
        :class="{'is-active': isFormatToggled('link')}"
        @click="onToggleLink"
      /> -->
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

    .is-active {
        background: #e0e0e0;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

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
