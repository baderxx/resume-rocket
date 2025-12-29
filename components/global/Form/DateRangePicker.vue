<script setup lang="ts">
import { computed } from "vue";

import type { DateRange } from "@/types/resumeData";

type DateRangePickerProps = {
  modelValue: DateRange;
  label?: string;
  error?: boolean;
  errorMessage?: string;
};

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  modelValue: () => ({
    startDate: "",
    endDate: "",
  }),
  label: "Start & End Date",
  error: false,
  errorMessage: "",
});

const emit = defineEmits(["update:modelValue", "blur"]);

const isError = computed(() => !!props.error);
const message = computed(
  () => props.errorMessage || `${props.label} is required and cannot be empty`,
);

const updateRange = (key: keyof DateRange, value: string) => {
  emit("update:modelValue", {
    ...(props.modelValue || { startDate: "", endDate: "" }),
    [key]: value,
  });
};
</script>
<template>
  <div class="w-full">
    <label
      class="text-sm font-normal capitalize"
      :class="isError ? 'text-red-500' : 'text-indigo-900'"
    >
      {{ label }}
    </label>
    <div class="mt-1 grid grid-cols-2 gap-2">
      <input
        :value="modelValue?.startDate"
        type="month"
        class="min-h-12 w-full rounded bg-[#eff2f9] p-2 focus:rounded-b-none focus:border-b-2 focus:outline-none"
        :class="
          isError
            ? 'rounded-b-none border-b-2 border-red-500'
            : 'focus:border-blue-600'
        "
        aria-label="Start date"
        @input="
          updateRange('startDate', ($event.target as HTMLInputElement).value)
        "
        @blur.prevent="emit('blur')"
      />
      <input
        :value="modelValue?.endDate"
        type="month"
        class="min-h-12 w-full rounded bg-[#eff2f9] p-2 focus:rounded-b-none focus:border-b-2 focus:outline-none"
        :class="
          isError
            ? 'rounded-b-none border-b-2 border-red-500'
            : 'focus:border-blue-600'
        "
        aria-label="End date"
        @input="
          updateRange('endDate', ($event.target as HTMLInputElement).value)
        "
        @blur.prevent="emit('blur')"
      />
    </div>
    <p v-if="isError" class="mt-1 text-xs text-red-500">
      {{ message }}
    </p>
  </div>
</template>
