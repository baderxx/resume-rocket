export type EmploymentHistoryItem = {
  jobTitle: string;
  employer: string;
  startAndEndDate: string; // Consider Date objects for easier handling
  city: string;
  description: string; // Rich text placeholder
};

export type ProjectItem = {
  projectName: string;
  url: string;
  startAndEndDate: string; // Consider Date objects
  description: string; // Rich text placeholder
};

export type EducationItem = {
  school: string;
  degree: string;
  startAndEndDate: string; // Consider Date objects
  city: string;
  description: string; // Rich text placeholder
};

export type SocialLinkItem = {
  label: string;
  url: string;
};

export type SkillItem = {
  skillName: string;
  expertiseLevel: number; // Numeric type likely better
};

export type LanguageItem = {
  language: string;
  fluency: string; // Or potentially an enum of fluency levels
};

export type CourseItem = {
  courseName: string;
  institution: string;
  startAndEndDate: string; // Consider Date objects
};

export type ExtraCurricularActivityItem = {
  activityTitle: string;
  startAndEndDate: string; // Consider Date objects
  city: string;
  description: string; // Rich text placeholder
};

export type ReferenceItem = {
  referenceFullName: string;
  company: string;
  phone: string;
  email: string;
};

export type ResumeInformation = {
  jobTitle: string;
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
  employmentHistory: EmploymentHistoryItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  socialLinks: SocialLinkItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  courses: CourseItem[];
  hobbies: HobbyItem[];
  extraCurricularActivities: ExtraCurricularActivityItem[];
  references: ReferenceItem[];
};

export type HobbyItem = {
  hobby: string;
};
