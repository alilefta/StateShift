import type { BoardState, ColumnType, Task } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState: BoardState = {
	tasks: {},
	columns: {
		todo: [],
		inProgress: [],
		done: [],
	},
};

const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<{ text: string; status: ColumnType; title?: string }>) => {
			const { text, status, title } = action.payload;
			const newTask: Task = {
				id: uuidv4(),
				text,
				title,
			};

			state.tasks[newTask.id] = { column: status, task: newTask };
			state.columns[status].push(newTask.id);
		},
		deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
			const { taskId } = action.payload;
			const { column } = state.tasks[taskId];

			// Remove from the column
			state.columns[column] = state.columns[column].filter((id) => id !== taskId);
			// Remove from the tasks map
			delete state.tasks[taskId];
		},
		moveTask: (state, action: PayloadAction<{ taskId: string; toColumn: ColumnType; overId?: string }>) => {
			const { taskId, toColumn, overId } = action.payload;
			const { column: fromColumn } = state.tasks[taskId];

			// Remove from source column
			state.columns[fromColumn] = state.columns[fromColumn].filter((id) => id !== taskId);

			// Add to destination column
			const destColumn = state.columns[toColumn];
			if (overId) {
				const overIndex = destColumn.findIndex((id) => id === overId);
				destColumn.splice(overIndex, 0, taskId);
			} else {
				destColumn.push(taskId);
			}

			// Update the task's column in the map
			state.tasks[taskId].column = toColumn;
		},
	},
});

export const { addTask, deleteTask, moveTask } = boardSlice.actions;

export default boardSlice.reducer;
