<script lang="ts" setup></script>
<template>
  <div class="relative mb-3">
    <h6 class="mb-0">
      <button
        class="rounded-t-1 text-dark-500 group relative flex w-full cursor-pointer items-center border-b border-solid border-slate-100 p-4 text-left font-semibold text-slate-700 transition-all ease-in"
        data-collapse-target="collapse-1"
      >
        <span>What is Material Tailwind?</span>
        <i
          class="fa fa-plus absolute right-0 pt-1 text-xs group-open:opacity-0"
        ></i>
        <i
          class="fa fa-minus absolute right-0 pt-1 text-xs opacity-0 group-open:opacity-100"
        ></i>
      </button>
    </h6>
    <div
      data-collapse="collapse-1"
      class="h-100 overflow-hidden transition-all duration-300 ease-in-out"
    >
      <div class="text-blue-gray-500/80 p-4 text-sm leading-normal">
        We're not always in the position that we want to be at. We're constantly
        growing. We're constantly making mistakes. We're constantly trying to
        express ourselves and actualize our dreams.
      </div>
    </div>
  </div>
</template>
