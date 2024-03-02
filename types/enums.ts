export enum RuntimeModes {
  DEVELOPMENT = "development",
}
export enum VuetifyTheme {
  DEFAULT_THEME = "resume-rocket-default-theme",
}

export enum ResumeA4Size {
  width = 595,
  height = 842,
}

type EmploymentHistory = {
  jobTitle: string;
  employer: string;
  startAndEndDate: string;
  city: string;
  description: string; // You may need to use a specific rich text type here
};

type Project = {
  projectName: string;
  url: string;
  startAndEndDate: string;
  description: string; // You may need to use a specific rich text type here
};

type Education = {
  school: string;
  degree: string;
  startAndEndDate: string;
  city: string;
  description: string; // You may need to use a specific rich text type here
};

type SocialLink = {
  label: string;
  url: string;
};

type Skill = {
  skillName: string;
  expertiseLevel: number;
};

type Language = {
  language: string;
  fluency: string;
};

type Course = {
  courseName: string;
  institution: string;
  startAndEndDate: string;
};

type ExtraCurricularActivity = {
  activityTitle: string;
  startAndEndDate: string;
  description: string; // You may need to use a specific rich text type here
};

type Reference = {
  referenceFullName: string;
  company: string;
  phone: string;
  email: string;
};

type ResumeInformation = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  drivingLicense: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  professionalSummary: string; // You may need to use a specific rich text type here
  employmentHistory: EmploymentHistory[];
  projects: Project[];
  education: Education[];
  socialLinks: SocialLink[];
  skills: Skill[];
  languages: Language[];
  courses: Course[];
  hobbies: string;
  extraCurricularActivities: ExtraCurricularActivity[];
  references: Reference[];
};
