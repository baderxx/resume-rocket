import { ref } from "vue";
import type { Ref } from "vue";

import type { ValidationRule } from "@/types/builder";
import { SectionTypes } from "@/types/enums";
import type {
  CourseItem,
  EducationItem,
  EmploymentHistoryItem,
  ExtraCurricularActivityItem,
  HobbyItem,
  LanguageItem,
  ProjectItem,
  ReferenceItem,
  ResumeInformation,
  SkillItem,
  SocialLinkItem,
} from "@/types/resumeData";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : any;
};

const requiredRule =
  (label: string): ValidationRule =>
  (value: unknown) => {
    if (typeof value === "string") {
      return value.trim().length > 0 ? true : `${label} is required`;
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? true : `${label} is required`;
    }

    if (value !== undefined && value !== null) {
      return true;
    }

    return `${label} is required`;
  };

const dateRangeRequiredRule =
  (label: string): ValidationRule =>
  (value: unknown) => {
    if (!value || typeof value !== "object") return `${label} is required`;
    const { startDate, endDate } = value as Record<string, unknown>;
    if (
      (typeof startDate === "string" && startDate.trim().length > 0) ||
      (typeof endDate === "string" && endDate.trim().length > 0)
    ) {
      return true;
    }
    return `${label} is required`;
  };

const createEmploymentHistoryItem = (): EmploymentHistoryItem => ({
  jobTitle: "",
  employer: "",
  startAndEndDate: {
    startDate: "",
    endDate: "",
  },
  city: "",
  description: "",
});

const createProjectItem = (): ProjectItem => ({
  projectName: "",
  url: "",
  startAndEndDate: {
    startDate: "",
    endDate: "",
  },
  description: "",
});

const createEducationItem = (): EducationItem => ({
  school: "",
  degree: "",
  startAndEndDate: {
    startDate: "",
    endDate: "",
  },
  city: "",
  description: "",
});

const createSocialLinkItem = (): SocialLinkItem => ({
  label: "",
  url: "",
});

const createSkillItem = (): SkillItem => ({
  skillName: "",
  expertiseLevel: 0,
});

const createLanguageItem = (): LanguageItem => ({
  language: "",
  fluency: "",
});

const createCourseItem = (): CourseItem => ({
  courseName: "",
  institution: "",
  startAndEndDate: {
    startDate: "",
    endDate: "",
  },
});

const createHobbyItem = (): HobbyItem => ({
  hobby: "",
});

const createExtraCurricularActivityItem = (): ExtraCurricularActivityItem => ({
  activityTitle: "",
  startAndEndDate: {
    startDate: "",
    endDate: "",
  },
  city: "",
  description: "",
});

const createReferenceItem = (): ReferenceItem => ({
  referenceFullName: "",
  company: "",
  phone: "",
  email: "",
});

export const resumeValidationRules: Record<
  string,
  Record<string, ValidationRule[]>
> = {
  jobTitle: { jobTitle: [requiredRule("Wanted job title")] },
  firstName: { firstName: [requiredRule("First name")] },
  lastName: { lastName: [requiredRule("Last name")] },
  email: { email: [requiredRule("Email")] },
  phoneNumber: { phoneNumber: [requiredRule("Phone number")] },
  country: { country: [requiredRule("Country")] },
  city: { city: [requiredRule("City")] },
  address: { address: [requiredRule("Address")] },
  postalCode: { postalCode: [requiredRule("Postal code")] },
  drivingLicense: { drivingLicense: [] },
  nationality: { nationality: [] },
  placeOfBirth: { placeOfBirth: [] },
  dateOfBirth: { dateOfBirth: [] },
  professionalSummary: { professionalSummary: [] },
  [SectionTypes.EMPLOYMENT_HISTORY]: {
    jobTitle: [requiredRule("Job title")],
    employer: [requiredRule("Employer")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
    city: [requiredRule("City")],
  },
  [SectionTypes.PROJECTS]: {
    projectName: [requiredRule("Project name")],
    url: [requiredRule("Project URL")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
  },
  [SectionTypes.EDUCATION]: {
    school: [requiredRule("School")],
    degree: [requiredRule("Degree")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
    city: [requiredRule("City")],
  },
  [SectionTypes.SOCIAL_LINKS]: {
    label: [requiredRule("Label")],
    url: [requiredRule("Url")],
  },
  [SectionTypes.SKILLS]: {
    skillName: [requiredRule("Skill name")],
    expertiseLevel: [requiredRule("Expertise level")],
  },
  [SectionTypes.LANGUAGES]: {
    language: [requiredRule("Language")],
    fluency: [requiredRule("Level")],
  },
  [SectionTypes.INTERNSHIPS]: {
    jobTitle: [requiredRule("Job title")],
    employer: [requiredRule("Employer")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
    city: [requiredRule("City")],
  },
  [SectionTypes.COURSES]: {
    courseName: [requiredRule("Course")],
    institution: [requiredRule("Institution")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
  },
  [SectionTypes.HOBBIES]: {
    hobby: [requiredRule("Hobby")],
  },
  [SectionTypes.EXTRA_CURRICULAR]: {
    activityTitle: [requiredRule("Activity title")],
    startAndEndDate: [dateRangeRequiredRule("Start & End Date")],
    city: [requiredRule("City")],
  },
  [SectionTypes.REFERENCES]: {
    referenceFullName: [requiredRule("Referent's full name")],
    company: [requiredRule("Company")],
    phone: [requiredRule("Phone")],
    email: [requiredRule("Email")],
  },
};

export const resumeInformationSchema: ResumeInformation = {
  jobTitle: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
  drivingLicense: "",
  nationality: "",
  placeOfBirth: "",
  dateOfBirth: "",
  professionalSummary: "",
  employmentHistory: [],
  projects: [],
  education: [],
  socialLinks: [],
  skills: [],
  languages: [],
  courses: [],
  hobbies: [],
  extraCurricularActivities: [],
  references: [],
};

export const createDefaultSectionItem = (sectionType: SectionTypes) => {
  switch (sectionType) {
    case SectionTypes.EMPLOYMENT_HISTORY:
      return createEmploymentHistoryItem();
    case SectionTypes.PROJECTS:
      return createProjectItem();
    case SectionTypes.EDUCATION:
      return createEducationItem();
    case SectionTypes.SOCIAL_LINKS:
      return createSocialLinkItem();
    case SectionTypes.SKILLS:
      return createSkillItem();
    case SectionTypes.LANGUAGES:
      return createLanguageItem();
    case SectionTypes.INTERNSHIPS:
      return createEmploymentHistoryItem();
    case SectionTypes.COURSES:
      return createCourseItem();
    case SectionTypes.HOBBIES:
      return createHobbyItem();
    case SectionTypes.EXTRA_CURRICULAR:
      return createExtraCurricularActivityItem();
    case SectionTypes.REFERENCES:
      return createReferenceItem();
    default:
      return {};
  }
};

export function useResumeInformation() {
  const resumeData: Ref<DeepPartial<ResumeInformation>> = ref(
    JSON.parse(JSON.stringify(resumeInformationSchema)),
  );

  return {
    resumeData,
  };
}
