import type { EditorFieldSchema, Section } from "@/types/builder";
import { EDITOR_FIELDS } from "@/types/builder";
import { SectionTypes } from "@/types/enums";

export const useUseBuilderFormTemplates = () => {
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
      },
      {
        title: "Employer",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "employer",
        cols: 6,
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "startAndEndDate",
        cols: 6,
      },
      {
        title: "City",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "city",
        cols: 6,
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
      },
      {
        title: "Degree",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "degree",
        cols: 6,
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "startAndEndDate",
        cols: 6,
      },
      {
        title: "City",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "city",
        cols: 6,
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
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "startAndEndDate",
        cols: 6,
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

  const WebsiteAndSocialLinksFormTemplate = computed<EditorFieldSchema[]>(
    () => {
      return [
        {
          title: "Label",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "label",
          cols: 6,
        },
        {
          title: "Url",
          type: EDITOR_FIELDS.START_AND_END_DATE,
          value: "",
          fieldName: "url",
          cols: 6,
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
        fieldName: "label",
        cols: 6,
      },
      {
        title: "Experties Level",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "expertiesLevel",
        cols: 6,
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
      },
      {
        title: "Level",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "fluency",
        cols: 6,
      },
    ];
  });

  const CourcesFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Cource",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "courseName",
        cols: 6,
      },
      {
        title: "Institution",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "institution",
        cols: 6,
      },
      {
        title: "Start & End Date",
        type: EDITOR_FIELDS.START_AND_END_DATE,
        value: "",
        fieldName: "startAndEndDate",
        cols: 6,
      },
    ];
  });

  const hobbiesFormTemplate = computed<EditorFieldSchema[]>(() => {
    return [
      {
        title: "Hobbies",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "hobbies",
        cols: 12,
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
        },
        {
          title: "Start & End Date",
          type: EDITOR_FIELDS.START_AND_END_DATE,
          value: "",
          fieldName: "startAndEndDate",
          cols: 6,
        },
        {
          title: "City",
          type: EDITOR_FIELDS.TEXT,
          value: "",
          fieldName: "city",
          cols: 6,
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
      },
      {
        title: "Company",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "company",
        cols: 6,
      },
      {
        title: "Phone",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "phone",
        cols: 6,
      },
      {
        title: "Email",
        type: EDITOR_FIELDS.TEXT,
        value: "",
        fieldName: "email",
        cols: 6,
      },
    ];
  });

  const experienceSection = computed<Section>(() => ({
    title: sectionTitle.value,
    subtitle: sectionSubtitle.value,
    formTemplate: experienceFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one or more experience items",
    dataKey: "employmentHistory",
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
    formTemplate: educationFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one or more experience items",
    dataKey: "education",
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
    formTemplate: projectsFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one or more project items",
    dataKey: "projects",
    itemTitleTemplate: [{ fieldName: "projectName" }],
  }));

  const websiteAndSocialLinksSection = computed<Section>(() => ({
    title: "Website and social links",
    subtitle:
      "Provide links to your personal website and professional social media profiles, such as LinkedIn, Twitter, Instagram, or Facebook. These platforms showcase your portfolio, work samples, professional achievements, and industry engagement. They also serve as networking tools for potential employers or collaborators to learn more about you and your expertise.",
    formTemplate: WebsiteAndSocialLinksFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more link",
    dataKey: "socialLinks",
    itemTitleTemplate: [{ fieldName: "label" }],
  }));

  const skillsSection = computed<Section>(() => ({
    title: "Skills",
    subtitle:
      "List your core competencies and technical proficiencies relevant to your field. Include both hard skills (e.g., software proficiency, data analysis) and soft skills (e.g., communication, leadership). Tailor this section to highlight skills that align with the job you're applying for, emphasizing those most valued by potential employers.",
    formTemplate: skillsFormTemplate.value, // #TODO: Add inline schema for section
    type: SectionTypes.SKILLS, // #TODO: figure this out
    addActionText: "Add one more skill",
    dataKey: "skills",
    itemTitleTemplate: [{ fieldName: "label" }],
  }));

  const languaeSection = computed<Section>(() => ({
    title: "Languages",
    subtitle:
      "Indicate your proficiency in languages other than your native tongue. Specify your level of fluency (e.g., fluent, proficient, basic) for each language listed. This section demonstrates your cultural awareness, communication abilities, and potential to work in diverse environments.",
    formTemplate: LanguagesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more language",
    dataKey: "languages",
    itemTitleTemplate: [{ fieldName: "language" }],
  }));

  const internshipSection = computed<Section>(() => ({
    title: "Internships",
    subtitle:
      "Detail any relevant internships or work experiences you've completed, including the organization, duration, and your responsibilities. Highlight key projects or achievements during your internship and quantify results whenever possible. This section illustrates your practical experience, professional growth, and readiness for entry-level positions in your field.",
    formTemplate: experienceFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more internship",
    dataKey: "internships",
    itemTitleTemplate: [
      { fieldName: "jobTitle" },
      { text: "at" },
      { fieldName: "employer" },
    ],
  }));

  const courcesSection = computed<Section>(() => ({
    title: "Courses",
    subtitle:
      "List any additional courses, workshops, or certifications you've completed to enhance your skills or knowledge base. Include the institution or platform where you completed each course and any notable achievements or learning outcomes. This section showcases your commitment to continuous learning and professional development.",
    formTemplate: CourcesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more cource",
    dataKey: "courses",
    itemTitleTemplate: [{ fieldName: "courseName" }],
  }));

  const hobbiesSection = computed<Section>(() => ({
    title: "Hobbies",
    subtitle:
      "Share your interests and extracurricular activities outside of work or academics. Briefly describe each hobby and how it contributes to your personal growth, creativity, or well-being. While not directly related to your professional qualifications, this section provides insight into your personality, interests, and potential cultural fit within an organization.",
    formTemplate: hobbiesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more hobby",
    dataKey: "hobbies",
    itemTitleTemplate: [{ fieldName: "courseName" }],
  }));

  const extraCurricularActivitiesSection = computed<Section>(() => ({
    title: "Extra-curricular Activities",
    subtitle:
      "Highlight your involvement in volunteer work, clubs, associations, or community initiatives. Describe your role, contributions, and any leadership positions held. Showcase how your extracurricular activities have developed skills such as teamwork, leadership, and communication. This section demonstrates your commitment to community engagement, leadership potential, and well-roundedness.",
    formTemplate: extraCurricularActivitiesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more activity",
    dataKey: "extraCurricularActivities",
    itemTitleTemplate: [{ fieldName: "activityTitle" }],
  }));

  const referencesSection = computed<Section>(() => ({
    title: "References",
    subtitle:
      "Indicate that references are available upon request. Avoid listing specific references unless requested by the employer. Ensure you have obtained permission from your references before providing their contact information. This section signals your readiness to provide credible testimonials from past employers, supervisors, or mentors when needed.",
    formTemplate: referenceFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more reference",
    dataKey: "references",
    itemTitleTemplate: [{ fieldName: "referenceFullName" }],
  }));

  const builderSections = computed<Section[]>(() => {
    return [
      experienceSection.value,
      projectSection.value,
      educationSection.value,
      websiteAndSocialLinksSection.value,
      skillsSection.value,
      languaeSection.value,
      internshipSection.value,
      courcesSection.value,
      hobbiesSection.value,
      extraCurricularActivitiesSection.value,
      referencesSection.value,
    ];
  });

  return {
    builderSections,
  };
};
