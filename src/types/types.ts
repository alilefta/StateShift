export type ColumnType = "todo" | "inProgress" | "done";

export interface Task {
	id: string;
	title?: string;
	text: string;
}

export interface BoardState {
	tasks: {
		[key: string]: { task: Task; column: ColumnType };
	};
	columns: {
		[key in ColumnType]: Task[];
	};
}
