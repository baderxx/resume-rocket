<script lang="ts" setup>
const title = ref("Personal Information form");
</script>
<template>
  <h3 class="text-xl">{{ title }}</h3>
  <div class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
    <div class="col-span-2">
      <form-text-field
        label="Wanted job title"
        placeholder="Enter your wanted job title"
      />
    </div>
    <div>
      <form-text-field label="First name" placeholder="Enter your first name" />
    </div>
    <div>
      <form-text-field label="Last name" placeholder="Enter your last name" />
    </div>
    <div>
      <form-text-field label="Email" placeholder="Enter your email" />
    </div>
    <div>
      <form-text-field
        label="Phone number"
        placeholder="Enter your phone number"
      />
    </div>
    <div>
      <form-text-field label="Country" placeholder="Enter your country" />
    </div>
    <div>
      <form-text-field label="City" placeholder="Enter your city" />
    </div>
  </div>
</template>
