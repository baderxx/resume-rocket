<script lang="ts" setup>
type TextFieldProps = {
  modelValue: string;
  label: string;
  placeholder: string;
  name?: string;
};

withDefaults(defineProps<Partial<TextFieldProps>>(), {
  modelValue: "",
  label: "label",
  placeholder: "placeholder",
  name: "",
});

const emit = defineEmits(["update:modelValue", "blur"]);

const isError = ref(false);
</script>
<template>
  <label
    class="text-sm font-normal capitalize"
    :class="isError ? 'text-red-500' : 'text-indigo-900'"
    >{{ label }}</label
  >
  <input
    :value="modelValue"
    type="text"
    :placeholder="placeholder"
    class="mt-1 min-h-12 w-full rounded bg-[#eff2f9] p-2 focus:rounded-b-none focus:border-b-2 focus:outline-none"
    :class="
      isError
        ? 'rounded-b-none border-b-2 border-red-500'
        : 'focus:border-blue-600'
    "
    @input="emit('update:modelValue', ($event.target as any).value)"
    @blur.prevent="emit('blur')"
  />
  <p v-if="isError" class="mt-1 text-xs text-red-500">
    {{ label }} is required and cannot be empty
  </p>
</template>
