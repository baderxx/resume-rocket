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

  const builderSections = computed<Section[]>(() => {
    return [
      experienceSection.value,
      projectSection.value,
      educationSection.value,
      websiteAndSocialLinksSection.value,
      skillsSection.value,
      languaeSection.value,
    ];
  });

  return {
    builderSections,
  };
};
