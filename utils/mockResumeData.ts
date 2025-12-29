import type { ResumeInformation } from "@/types/resumeData";

export const mockResumeInformation: ResumeInformation = {
  jobTitle: "Senior Software Engineer",
  firstName: "Taylor",
  lastName: "Morgan",
  email: "taylor.morgan@example.com",
  phoneNumber: "+1 555-123-4567",
  country: "United States",
  city: "Austin",
  address: "123 Main Street",
  postalCode: "78701",
  drivingLicense: "",
  nationality: "American",
  placeOfBirth: "Denver",
  dateOfBirth: "1990-06-15",
  professionalSummary:
    "Seasoned engineer with a focus on building reliable, user-centric applications. Passionate about mentoring, accessibility, and shipping polished experiences.",
  employmentHistory: [
    {
      jobTitle: "Lead Frontend Engineer",
      employer: "Brightwave Labs",
      startAndEndDate: { startDate: "2019-01", endDate: "" },
      city: "Austin",
      description:
        "Guided a cross-functional squad delivering design systems, improved Lighthouse scores by 28%, and mentored four engineers to senior roles.",
    },
    {
      jobTitle: "Software Engineer",
      employer: "Northwind",
      startAndEndDate: { startDate: "2016-06", endDate: "2019-06" },
      city: "Remote",
      description:
        "Built customer onboarding flows, collaborated with product on experimentation, and reduced onboarding time by 35%.",
    },
  ],
  projects: [
    {
      projectName: "Resume Rocket",
      url: "resumerocket.app",
      startAndEndDate: { startDate: "2023-01", endDate: "2023-12" },
      description:
        "A streamlined resume builder featuring live previews, reusable templates, and accessible defaults.",
    },
  ],
  education: [
    {
      school: "University of Colorado",
      degree: "B.S. Computer Science",
      startAndEndDate: { startDate: "2012-09", endDate: "2016-05" },
      city: "Boulder",
      description:
        "Graduated magna cum laude with a focus on human-computer interaction.",
    },
  ],
  socialLinks: [
    { label: "LinkedIn", url: "linkedin.com/in/taylor-morgan" },
    { label: "GitHub", url: "github.com/tmorgan" },
  ],
  skills: [
    { skillName: "Vue & Nuxt", expertiseLevel: 5 },
    { skillName: "TypeScript", expertiseLevel: 5 },
    { skillName: "Accessibility", expertiseLevel: 4 },
    { skillName: "UI Architecture", expertiseLevel: 4 },
  ],
  languages: [
    { language: "English", fluency: "Native" },
    { language: "Spanish", fluency: "Conversational" },
  ],
  courses: [],
  hobbies: [{ hobby: "Cycling" }, { hobby: "Photography" }],
  extraCurricularActivities: [],
  references: [
    {
      referenceFullName: "Alex Johnson",
      company: "Brightwave Labs",
      phone: "+1 555-987-6543",
      email: "alex.johnson@brightwave.com",
    },
  ],
};

export const modernMockResumeInformation: ResumeInformation = {
  ...mockResumeInformation,
  jobTitle: "Product Designer",
  firstName: "Jordan",
  lastName: "Chen",
  city: "Seattle",
  professionalSummary:
    "Designs thoughtful, intuitive experiences that balance business goals with user needs. Expert in design systems, prototyping, and facilitating discovery workshops.",
  skills: [
    { skillName: "Design Systems", expertiseLevel: 5 },
    { skillName: "Figma", expertiseLevel: 5 },
    { skillName: "Prototyping", expertiseLevel: 4 },
    { skillName: "UX Research", expertiseLevel: 4 },
  ],
  employmentHistory: [
    {
      jobTitle: "Senior Product Designer",
      employer: "Lighthouse",
      startAndEndDate: { startDate: "2020-01", endDate: "" },
      city: "Seattle",
      description:
        "Own end-to-end experience strategy for the analytics suite, partnering with engineering to ship features used by 20k+ customers.",
    },
  ],
};
