export enum EDITOR_FIELDS {
    TEXT = 'text',
    START_AND_END_DATE = 'startAndEndDate',
    EDITOR = 'editor'
}

export type EditorFieldSchema = {
    title: string,
    type: EDITOR_FIELDS,
    value: string,
    cols: number
}