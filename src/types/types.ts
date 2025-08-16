export type ColumnType = "todo" | "inProgress" | "done";

export interface Task {
	id: string;
	title?: string;
	text: string;
}
