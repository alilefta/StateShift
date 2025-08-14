export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
	id: string;
	title: string;
	text: string;
	status: TaskStatus;
}

export interface Column {
	todo: Task[];
	type: TaskStatus;
	title: string;
}
