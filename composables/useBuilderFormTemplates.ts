import type { EditorFieldSchema, Section } from "@/types/builder";
import { EDITOR_FIELDS } from "@/types/builder";

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
    subtitle: sectionSubtitle.value,
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
    subtitle: sectionSubtitle.value,
    formTemplate: projectsFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one or more project items",
    dataKey: "projects",
    itemTitleTemplate: [{ fieldName: "projectName" }],
  }));

  const websiteAndSocialLinksSection = computed<Section>(() => ({
    title: "Website and social links",
    subtitle: sectionSubtitle.value,
    formTemplate: WebsiteAndSocialLinksFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more link",
    dataKey: "socialLinks",
    itemTitleTemplate: [{ fieldName: "label" }],
  }));

  const skillsSection = computed<Section>(() => ({
    title: "Skills",
    subtitle: sectionSubtitle.value,
    formTemplate: skillsFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more skill",
    dataKey: "skills",
    itemTitleTemplate: [{ fieldName: "label" }],
  }));

  const languaeSection = computed<Section>(() => ({
    title: "Languages",
    subtitle: sectionSubtitle.value,
    formTemplate: LanguagesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more language",
    dataKey: "languages",
    itemTitleTemplate: [{ fieldName: "language" }],
  }));

  const internshipSection = computed<Section>(() => ({
    title: "Internships",
    subtitle: sectionSubtitle.value,
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
    title: "Cources",
    subtitle: sectionSubtitle.value,
    formTemplate: CourcesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more cource",
    dataKey: "courses",
    itemTitleTemplate: [{ fieldName: "courseName" }],
  }));

  const hobbiesSection = computed<Section>(() => ({
    title: "Hobbies",
    subtitle: sectionSubtitle.value,
    formTemplate: hobbiesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more hobby",
    dataKey: "hobbies",
    itemTitleTemplate: [{ fieldName: "courseName" }],
  }));

  const extraCurricularActivitiesSection = computed<Section>(() => ({
    title: "Extra-curricular Activities",
    subtitle: sectionSubtitle.value,
    formTemplate: extraCurricularActivitiesFormTemplate.value, // #TODO: Add inline schema for section
    type: "some type", // #TODO: figure this out
    addActionText: "Add one more activity",
    dataKey: "extraCurricularActivities",
    itemTitleTemplate: [{ fieldName: "activityTitle" }],
  }));

  const referencesSection = computed<Section>(() => ({
    title: "References",
    subtitle: sectionSubtitle.value,
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
