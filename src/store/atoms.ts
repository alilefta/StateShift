import type { ColumnType, Task } from "@/types/types";
import { atom } from "jotai";

export const tasksMapAtom = atom<{ [key: string]: Task }>({});

export const todoAtom = atom<string[]>([]);
export const inProgressAtom = atom<string[]>([]);
export const doneAtom = atom<string[]>([]);

// Write-only functions, act like Actions
export const moveTaskAtom = atom(null, (get, set, { taskId, toColumn, overId }: { taskId: string; toColumn: ColumnType; overId?: string }) => {
	const isTaskInTodo = get(todoAtom).find((id) => id === taskId);
	const isTaskInInProgress = get(inProgressAtom).find((id) => id === taskId);
	const isTaskInDone = get(doneAtom).find((id) => id === taskId);

	const fromColumn = isTaskInTodo ? todoAtom : isTaskInInProgress ? inProgressAtom : isTaskInDone ? doneAtom : null;
	const destColumn = toColumn === "todo" ? todoAtom : toColumn === "inProgress" ? inProgressAtom : doneAtom;

	if (fromColumn) {
		set(fromColumn, (state) => state.filter((id) => id !== taskId));

		if (overId) {
			const overIndex = get(destColumn).findIndex((id) => id === overId);
			set(destColumn, get(destColumn).splice(overIndex, 0, taskId));
		} else {
			set(destColumn, (state) => [...state, taskId]);
		}
	}
});

export const getTodoTasksAtom = atom((get) => {
	const tasks: Task[] = [];
	const tasksIds = get(todoAtom);
	for (const key in get(tasksMapAtom)) {
		if (tasksIds.includes(key)) {
			tasks.push(get(tasksMapAtom)[key]);
		}
	}

	return tasks;
});

export const getInProgressTasksAtom = atom((get) => {
	const tasks: Task[] = [];
	const tasksIds = get(inProgressAtom);
	for (const key in get(tasksMapAtom)) {
		if (tasksIds.includes(key)) {
			tasks.push(get(tasksMapAtom)[key]);
		}
	}

	return tasks;
});

export const getDoneTasksAtom = atom((get) => {
	const tasks: Task[] = [];
	const tasksIds = get(doneAtom);
	for (const key in get(tasksMapAtom)) {
		if (tasksIds.includes(key)) {
			tasks.push(get(tasksMapAtom)[key]);
		}
	}

	return tasks;
});

export const removeTaskAtom = atom(null, (get, set, { taskId }: { taskId: string }) => {
	const isTaskInTodo = get(todoAtom).find((id) => id === taskId);
	const isTaskInInProgress = get(inProgressAtom).find((id) => id === taskId);
	const isTaskInDone = get(doneAtom).find((id) => id === taskId);

	const column = isTaskInTodo ? todoAtom : isTaskInInProgress ? inProgressAtom : isTaskInDone ? doneAtom : null;

	if (!column) return;
	set(column, (state) => state.filter((id) => id !== taskId));

	const filteredMap: { [taskId: string]: Task } = {};

	for (const key in get(tasksMapAtom)) {
		if (key !== taskId) {
			filteredMap[key] = get(tasksMapAtom)[key];
		}
	}
	set(tasksMapAtom, { ...filteredMap });
});
