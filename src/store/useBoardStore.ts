import type { ColumnType, Task } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer"; // Import immer

export interface BoardState {
	columns: {
		[key in ColumnType]: Task[];
	};
	addTask: (text: string, status: ColumnType, title?: string) => void;
	updateTask: (taskId: string, text: string, status: ColumnType) => void;
	deleteTask: (taskId: string) => void;
	moveTask: (taskId: string, fromColumn: ColumnType, toColumn: ColumnType, overId?: string) => void;
	findTask: (taskId: string) => { task: Task | undefined; column: ColumnType };
}

//Observation: Your findTask function is complex and inefficient.
// It has to potentially search through all three arrays.
// Best Practice: When you need to frequently look up items by ID,
// a better state shape is a normalized one.
// You can store your tasks in a map (an object where keys are task IDs) and your columns as arrays of just the IDs.
// This makes lookups instantaneous (O(1)).

export const useBoardStore = create<BoardState>()(
	immer(
		// To let you update state safely which looks like chaning it in mutable way
		persist(
			(set, get) => ({
				columns: { todo: [], inProgress: [], done: [] },
				addTask: (text, status, title) => {
					set((state) => {
						// ✅ This LOOKS like a mutation, but Immer makes it safe!
						state.columns[status].push({ id: uuidv4(), text, title });
					});
				},
				updateTask: (taskId: string, newText: string) => {
					const { task, column } = get().findTask(taskId);
					if (task) {
						set((state) => ({
							columns: {
								...state.columns,
								[column]: [...state.columns[column].map((item) => (item.id === taskId ? { ...item, text: newText } : item))],
							},
						}));
					}
				},
				deleteTask: (taskId: string) => {
					const { task, column } = get().findTask(taskId);
					if (task) {
						set((state) => {
							// ✅ Much easier to read!
							state.columns[column] = state.columns[column].filter((t) => t.id !== taskId);
						});
					}
				},
				moveTask: (taskId: string, fromColumn: ColumnType, toColumn: ColumnType, overId?: string) => {
					set((state) => {
						// Find the task to move
						const taskToMove = state.columns[fromColumn].find((task) => task.id === taskId);
						if (!taskToMove) return state;

						// Remove the task from the source column
						state.columns[fromColumn] = state.columns[fromColumn].filter((task) => task.id !== taskId);

						if (overId) {
							// Find the index where to insert
							const overIndex = state.columns[toColumn].findIndex((task) => task.id === overId);

							if (overIndex !== -1) {
								// Insert the task at the specific position
								state.columns[toColumn].splice(overIndex, 0, taskToMove);
							} else {
								// If overId not found, append to the end
								state.columns[toColumn].push(taskToMove);
							}
						} else {
							// If no overId, append to the end
							state.columns[toColumn].push(taskToMove);
						}
					});
				},
				findTask: (taskId: string): { task: Task | undefined; column: ColumnType } => {
					return get().columns.todo.some((task) => task.id === taskId)
						? { task: get().columns.todo.find((task) => task.id === taskId), column: "todo" }
						: get().columns.inProgress.some((task) => task.id === taskId)
						? { task: get().columns.inProgress.find((task) => task.id === taskId), column: "inProgress" }
						: { task: get().columns.done.find((task) => task.id === taskId), column: "done" };
				},
			}),
			{ name: "state-shift-tasks" }
		)
	)
);
