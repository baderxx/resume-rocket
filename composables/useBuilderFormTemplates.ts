import { computed } from "vue";

import type { EditorFieldSchema, Section } from "@/types/builder";
import { EDITOR_FIELDS } from "@/types/builder";
import { SectionTypes } from "@/types/enums";

export const useUseBuilderFormTemplates = () => {
  const requiredRule = (label: string) => (value: unknown) => {
    if (typeof value === "string" && value.trim()) return true;
    if (value) return true;
    return `${label} is required`;
  };

  const dateRangeRule = (label: string) => (value: unknown) => {
    if (!value || typeof value !== "object") return `${label} is required`;
    const { startDate, endDate } = value as Record<string, string>;
    if (typeof startDate === "string" && startDate.trim()) return true;
    if (typeof endDate === "string" && endDate.trim()) return true;
    return `${label} is required`;
  };

  const sectionTitle = computed(() => {
    return "Employment History";
  });

  const sectionSubtitle = computed(() => {
    return "Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).";
  });

  const experienceFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Job Title",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "jobTitle",
        cols: 6,
        rules: [requiredRule("Job Title")],
      },
      {
        title: "Employer",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "employer",
        cols: 6,
        rules: [requiredRule("Employer")],
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: {
          startDate: "",
          endDate: "",
        },
        fieldName: "startAndEndDate",
        cols: 6,
        rules: [dateRangeRule("Start & End Date")],
      },
      {
        title: "City",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "city",
        cols: 6,
        rules: [requiredRule("City")],
      },
      {
        title: "Description",
        type: EDITOR_FIELDS.EDITOR,
        value: "",
        fieldName: "description",
        cols: 12,
      },
    ];
  });

  const educationFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "School",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "school",
        cols: 6,
        rules: [requiredRule("School")],
      },
      {
        title: "Degree",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "degree",
        cols: 6,
        rules: [requiredRule("Degree")],
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: {
          startDate: "",
          endDate: "",
        },
        fieldName: "startAndEndDate",
        cols: 6,
        rules: [dateRangeRule("Start & End Date")],
      },
      {
        title: "City",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "city",
        cols: 6,
        rules: [requiredRule("City")],
      },
      {
        title: "Description",
        type: EDITOR_FIELDS.EDITOR,
        value: "",
        fieldName: "description",
        cols: 12,
      },
    ];
  });

  const projectsFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Aсtivity name, job title, book title etc.",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "projectName",
        cols: 6,
        rules: [requiredRule("Project Name")],
      },
      {
        title: "Project URL",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "url",
        cols: 6,
        rules: [requiredRule("Project URL")],
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: {
          startDate: "",
          endDate: "",
        },
        fieldName: "startAndEndDate",
        cols: 6,
        rules: [dateRangeRule("Start & End Date")],
      },
      {
        title: "Description",
        type: EDITOR_FIELDS.EDITOR,
        value: "",
        fieldName: "description",
        cols: 12,
      },
    ];
  });

  const websiteAndSocialLinksFormTemplate = computed<EditorFieldSchema[]>(
    () => {
      return [
        {
          title: "Label",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "label",
          cols: 6,
          rules: [requiredRule("Label")],
        },
        {
          title: "Url",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "url",
          cols: 6,
          rules: [requiredRule("Url")],
        },
      ];
    },
  );

  const skillsFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Skill name",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "skillName",
        cols: 6,
        rules: [requiredRule("Skill name")],
      },
      {
        title: "Expertise Level",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "expertiseLevel",
        cols: 6,
        rules: [requiredRule("Expertise Level")],
      },
    ];
  });

  const LanguagesFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Language",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "language",
        cols: 6,
        rules: [requiredRule("Language")],
      },
      {
        title: "Level",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "fluency",
        cols: 6,
        rules: [requiredRule("Level")],
      },
    ];
  });

  const coursesFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Course",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "courseName",
        cols: 6,
        rules: [requiredRule("Course")],
      },
      {
        title: "Institution",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "institution",
        cols: 6,
        rules: [requiredRule("Institution")],
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: {
          startDate: "",
          endDate: "",
        },
        fieldName: "startAndEndDate",
        cols: 6,
        rules: [dateRangeRule("Start & End Date")],
      },
    ];
  });

  const hobbiesFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Hobbies",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "hobby",
        cols: 12,
        rules: [requiredRule("Hobby")],
      },
    ];
  });

  const extraCurricularActivitiesFormTemplate = computed<EditorFieldSchema[]>(
    () => {
      return [
        {
          title: "Activity title",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "activityTitle",
          cols: 6,
          rules: [requiredRule("Activity title")],
        },
        {
          title: "Start & End Date",
          type: EDITOR_FIELDS.START_AND_END_DATE,
          value: {
            startDate: "",
            endDate: "",
          },
          fieldName: "startAndEndDate",
          cols: 6,
          rules: [dateRangeRule("Start & End Date")],
        },
        {
          title: "City",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "city",
          cols: 6,
          rules: [requiredRule("City")],
        },
        {
          title: "Description",
          type: EDITOR_FIELDS.EDITOR,
          value: "",
          fieldName: "description",
          cols: 12,
        },
      ];
    },
  );

  const referenceFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Referent's Full Name",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "referenceFullName",
        cols: 6,
        rules: [requiredRule("Referent's Full Name")],
      },
      {
        title: "Company",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "company",
        cols: 6,
        rules: [requiredRule("Company")],
      },
      {
        title: "Phone",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "phone",
        cols: 6,
        rules: [requiredRule("Phone")],
      },
      {
        title: "Email",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "email",
        cols: 6,
        rules: [requiredRule("Email")],
      },
    ];
  });

  const experienceSection = computed<Section>(() => ({
    title: sectionTitle.value,
    subtitle: sectionSubtitle.value,
    formTemplate: experienceFormTemplate.value,
    type: SectionTypes.EMPLOYMENT_HISTORY,
    addActionText: "Add one or more experience items",
    dataKey: SectionTypes.EMPLOYMENT_HISTORY,
    itemTitleTemplate: [
      { fieldName: "jobTitle" },
      { text: "at" },
      { fieldName: "employer" },
    ],
  }));

  const educationSection = computed<Section>(() => ({
    title: "Education",
    subtitle:
      "Highlight your academic background, including your degree, the institution you attended, and relevant coursework. If you achieved any honors or distinctions, mention them here as well. This section provides insight into your foundational knowledge and expertise in your field of study.",
    formTemplate: educationFormTemplate.value,
    type: SectionTypes.EDUCATION,
    addActionText: "Add one or more education items",
    dataKey: SectionTypes.EDUCATION,
    itemTitleTemplate: [
      { fieldName: "school" },
      { text: "at" },
      { fieldName: "degree" },
    ],
  }));

  const projectSection = computed<Section>(() => ({
    title: "Projects",
    subtitle:
      "Detail any significant projects you've worked on, whether academic or professional. Describe the objectives of each project, your role and contributions, methodologies used, and the outcomes achieved. Emphasize any unique challenges overcome or innovative solutions implemented. This section demonstrates your practical skills and ability to apply theoretical knowledge to real-world scenarios.",
    formTemplate: projectsFormTemplate.value,
    type: SectionTypes.PROJECTS,
    addActionText: "Add one or more project items",
    dataKey: SectionTypes.PROJECTS,
    itemTitleTemplate: [{ fieldName: "projectName" }, { fieldName: "url" }],
  }));

  const websiteAndSocialLinksSection = computed<Section>(() => ({
    title: "Website and social links",
    subtitle:
      "Provide links to your personal website and professional social media profiles, such as LinkedIn, Twitter, Instagram, or Facebook. These platforms showcase your portfolio, work samples, professional achievements, and industry engagement. They also serve as networking tools for potential employers or collaborators to learn more about you and your expertise.",
    formTemplate: websiteAndSocialLinksFormTemplate.value,
    type: SectionTypes.SOCIAL_LINKS,
    addActionText: "Add one more link",
    dataKey: SectionTypes.SOCIAL_LINKS,
    itemTitleTemplate: [{ fieldName: "label" }, { fieldName: "url" }],
  }));

  const skillsSection = computed<Section>(() => ({
    title: "Skills",
    subtitle:
      "List your core competencies and technical proficiencies relevant to your field. Include both hard skills (e.g., software proficiency, data analysis) and soft skills (e.g., communication, leadership). Tailor this section to highlight skills that align with the job you're applying for, emphasizing those most valued by potential employers.",
    formTemplate: skillsFormTemplate.value,
    type: SectionTypes.SKILLS,
    addActionText: "Add one more skill",
    dataKey: SectionTypes.SKILLS,
    itemTitleTemplate: [{ fieldName: "skillName" }],
  }));

  const languageSection = computed<Section>(() => ({
    title: "Languages",
    subtitle:
      "Indicate your proficiency in languages other than your native tongue. Specify your level of fluency (e.g., fluent, proficient, basic) for each language listed. This section demonstrates your cultural awareness, communication abilities, and potential to work in diverse environments.",
    formTemplate: LanguagesFormTemplate.value,
    type: SectionTypes.LANGUAGES,
    addActionText: "Add one more language",
    dataKey: SectionTypes.LANGUAGES,
    itemTitleTemplate: [{ fieldName: "language" }],
  }));

  const internshipSection = computed<Section>(() => ({
    title: "Internships",
    subtitle:
      "Detail any relevant internships or work experiences you've completed, including the organization, duration, and your responsibilities. Highlight key projects or achievements during your internship and quantify results whenever possible. This section illustrates your practical experience, professional growth, and readiness for entry-level positions in your field.",
    formTemplate: experienceFormTemplate.value,
    type: SectionTypes.INTERNSHIPS,
    addActionText: "Add one more internship",
    dataKey: SectionTypes.INTERNSHIPS,
    itemTitleTemplate: [
      { fieldName: "jobTitle" },
      { text: "at" },
      { fieldName: "employer" },
    ],
  }));

  const coursesSection = computed<Section>(() => ({
    title: "Courses",
    subtitle:
      "List any additional courses, workshops, or certifications you've completed to enhance your skills or knowledge base. Include the institution or platform where you completed each course and any notable achievements or learning outcomes. This section showcases your commitment to continuous learning and professional development.",
    formTemplate: coursesFormTemplate.value,
    type: SectionTypes.COURSES,
    addActionText: "Add one more course",
    dataKey: SectionTypes.COURSES,
    itemTitleTemplate: [{ fieldName: "courseName" }],
  }));

  const hobbiesSection = computed<Section>(() => ({
    title: "Hobbies",
    subtitle:
      "Share your interests and extracurricular activities outside of work or academics. Briefly describe each hobby and how it contributes to your personal growth, creativity, or well-being. While not directly related to your professional qualifications, this section provides insight into your personality, interests, and potential cultural fit within an organization.",
    formTemplate: hobbiesFormTemplate.value,
    type: SectionTypes.HOBBIES,
    addActionText: "Add one more hobby",
    dataKey: SectionTypes.HOBBIES,
    itemTitleTemplate: [{ fieldName: "hobby" }],
  }));

  const extraCurricularActivitiesSection = computed<Section>(() => ({
    title: "Extra-curricular Activities",
    subtitle:
      "Highlight your involvement in volunteer work, clubs, associations, or community initiatives. Describe your role, contributions, and any leadership positions held. Showcase how your extracurricular activities have developed skills such as teamwork, leadership, and communication. This section demonstrates your commitment to community engagement, leadership potential, and well-roundedness.",
    formTemplate: extraCurricularActivitiesFormTemplate.value,
    type: SectionTypes.EXTRA_CURRICULAR,
    addActionText: "Add one more activity",
    dataKey: SectionTypes.EXTRA_CURRICULAR,
    itemTitleTemplate: [{ fieldName: "activityTitle" }],
  }));

  const referencesSection = computed<Section>(() => ({
    title: "References",
    subtitle:
      "Indicate that references are available upon request. Avoid listing specific references unless requested by the employer. Ensure you have obtained permission from your references before providing their contact information. This section signals your readiness to provide credible testimonials from past employers, supervisors, or mentors when needed.",
    formTemplate: referenceFormTemplate.value,
    type: SectionTypes.REFERENCES,
    addActionText: "Add one more reference",
    dataKey: SectionTypes.REFERENCES,
    itemTitleTemplate: [{ fieldName: "referenceFullName" }],
  }));

  const builderSections = computed<Section[]>(() => {
    return [
      experienceSection.value,
      projectSection.value,
      educationSection.value,
      websiteAndSocialLinksSection.value,
      skillsSection.value,
      languageSection.value,
      internshipSection.value,
      coursesSection.value,
      hobbiesSection.value,
      extraCurricularActivitiesSection.value,
      referencesSection.value,
    ];
  });

  return {
    builderSections,
  };
};
