import { useMemo, useReducer, type ReactNode, type Reducer } from "react";
import { BoardContext, type BoardActions, type BoardContextType } from "./BoardContext";
import { v4 as uuidv4 } from "uuid";
import type { BoardState, Task } from "@/types/types";

interface BoardProviderProps {
	children: ReactNode;
}

const reducer: Reducer<BoardState, BoardActions> = (prevState: BoardState, action: BoardActions) => {
	switch (action.type) {
		case "ADD_TASK": {
			const column = action.payload.status;
			const newTask: Task = {
				id: uuidv4(),
				text: action.payload.text,
				title: action.payload.title,
			};

			return {
				...prevState,
				columns: {
					...prevState.columns,
					[column]: [...prevState.columns[column], newTask.id],
				},
				tasks: {
					...prevState.tasks,
					[newTask.id]: { task: newTask, column },
				},
			};
		}

		case "DELETE_TASK": {
			const { task, column } = prevState.tasks[action.payload.taskId];

			if (!task) return { ...prevState };

			const updatedTasks = Object.fromEntries(Object.entries(prevState.tasks).filter(([id]) => id !== task.id));

			return {
				...prevState,
				columns: { ...prevState.columns, [column]: [...prevState.columns[column].filter((t) => t !== task.id)] },
				tasks: {
					...updatedTasks,
				},
			};
		}

		case "UPDATE_TASK": {
			const { task } = prevState.tasks[action.payload.taskId];
			if (!task) return { ...prevState };

			return {
				...prevState,
				tasks: { ...prevState.tasks, [task.id]: { task: { ...task, text: action.payload.text }, column: prevState.tasks[task.id].column } },
			};
		}

		case "MOVE_TASK": {
			const { taskId, toColumn, overId } = action.payload;
			const { task, column: fromColumn } = prevState.tasks[taskId];

			if (!task) return { ...prevState };

			const sourceColumn = [...prevState.columns[fromColumn].filter((tId) => tId !== taskId)];
			const destinationColumn = [...prevState.columns[toColumn]];

			if (overId) {
				const overIndex = destinationColumn.findIndex((tId) => tId === overId);
				if (overIndex !== -1) {
					destinationColumn.splice(overIndex, 0, taskId);
				} else {
					destinationColumn.push(taskId);
				}
			} else {
				destinationColumn.push(taskId);
			}

			return {
				columns: {
					...prevState.columns,
					[fromColumn]: sourceColumn,
					[toColumn]: destinationColumn,
				},
				tasks: {
					...prevState.tasks,
					[taskId]: { task, column: toColumn },
				},
			};
		}

		// case "FIND_TASK": {
		// 	return { ...prevState };
		// }
		default:
			throw new Error("Unuhandled case in BoardProvider");
	}
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
	const initialState: BoardState = {
		tasks: {},
		columns: {
			todo: [],
			inProgress: [],
			done: [],
		},
	};

	const [boardState, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo((): BoardContextType => {
		return { boardState, dispatch };
	}, [boardState]);

	return <BoardContext value={contextValue}>{children}</BoardContext>;
};
