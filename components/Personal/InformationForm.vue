<script lang="ts" setup>
import { useResumeInformation } from "@/composables/useResumeInformation";

const title = ref("Personal Information form");
const { resumeData } = useResumeInformation();
</script>
<template>
  <h3 class="text-xl">{{ title }}</h3>
  <div class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
    <div>
      <form-text-field
        v-model="resumeData.firstName"
        label="First name"
        placeholder="Enter your first name"
      />
    </div>
    <div>
      <form-text-field
        v-model="resumeData.lastName"
        label="Last name"
        placeholder="Enter your last name"
      />
    </div>
    <div class="col-span-2">
      <form-text-field
        v-model="resumeData.jobTitle"
        label="Wanted job title"
        placeholder="Enter your wanted job title"
      />
    </div>
    <div>
      <form-text-field
        v-model="resumeData.email"
        label="Email"
        placeholder="Enter your email"
      />
    </div>
    <div>
      <form-text-field
        v-model="resumeData.phoneNumber"
        label="Phone number"
        placeholder="Enter your phone number"
      />
    </div>
    <div>
      <form-text-field
        v-model="resumeData.country"
        label="Country"
        placeholder="Enter your country"
      />
    </div>
    <div>
      <form-text-field
        v-model="resumeData.city"
        label="City"
        placeholder="Enter your city"
      />
    </div>
  </div>
</template>
