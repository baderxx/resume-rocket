export enum EDITOR_FIELDS {
  TEXT = "text",
  START_AND_END_DATE = "startAndEndDate",
  EDITOR = "editor",
}

export type EditorFieldSchema = {
  title: string;
  type: EDITOR_FIELDS;
  value: string;
  fieldName: string;
  cols: number;
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
