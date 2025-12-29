export enum EDITOR_FIELDS {
  TEXT = "text",
  START_AND_END_DATE = "startAndEndDate",
  EDITOR = "editor",
}

export type ValidationRule = (value: unknown) => true | string;

export type EditorFieldSchema = {
  title: string;
  type: EDITOR_FIELDS;
  value: any;
  fieldName: string;
  cols: number;
  rules?: ValidationRule[];
};

export type SectionItemTitleTemplate = { fieldName: string } | { text: string };

export type Section = {
  title: string;
  subtitle: string;
  formTemplate: EditorFieldSchema[];
  type: string;
  addActionText: string;
  dataKey: string;
  itemTitleTemplate: SectionItemTitleTemplate[];
};
