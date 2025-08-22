import type { ColumnType, Task } from "@/types/types";
import { Column } from "./Column";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { doneAtom, getDoneTasksAtom, getInProgressTasksAtom, getTodoTasksAtom, inProgressAtom, moveTaskAtom, todoAtom } from "@/store/atoms";
import { useAtom, useSetAtom } from "jotai";

export const Board = () => {
	const [activeTask, setActiveTask] = useState<Task | null>(null);

	const [todoTaskIds] = useAtom(todoAtom);
	const [inProgressTaskIds] = useAtom(inProgressAtom);
	const [doneTaskIds] = useAtom(doneAtom);

	const [todoTasks] = useAtom(getTodoTasksAtom);
	const [inProgressTasks] = useAtom(getInProgressTasksAtom);
	const [doneTasks] = useAtom(getDoneTasksAtom);

	const moveTask = useSetAtom(moveTaskAtom);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const { task } = active.data.current as { task: Task };
		setActiveTask(task);
	};

	useEffect(() => {}, [todoTaskIds, inProgressTaskIds, doneTaskIds]);

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveTask(null);

		const { active, over } = event;

		if (!over) return;

		const activeId = String(active.id);
		const overId = String(over.id);

		// Find the task's current column
		const isTaskInTodo = todoTaskIds.find((id) => id === activeId);
		const isTaskInInProgress = inProgressTaskIds.find((id) => id === activeId);
		const isTaskInDone = doneTaskIds.find((id) => id === activeId);

		const fromColumn = isTaskInTodo ? todoAtom : isTaskInInProgress ? inProgressAtom : isTaskInDone ? doneAtom : null;

		// Get the destination column
		const toColumn = over.data.current?.sortable?.containerId || over.id;

		// Validate columns
		if (!fromColumn) return;
		if (toColumn !== "todo" && toColumn !== "inProgress" && toColumn !== "done") return;

		// Don't do anything if dropping the task on itself
		if (activeId === overId && fromColumn === toColumn) return;

		moveTask({ taskId: activeId, toColumn: toColumn as ColumnType, overId: overId === toColumn ? undefined : overId });
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);
	return (
		<DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6 min-h-screen bg-gray-50">
				<Column id="todo" tasks={todoTasks} title="Todo" className="bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg" />
				<Column id="inProgress" tasks={inProgressTasks} title="In-progress" className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-lg" />
				<Column id="done" tasks={doneTasks} title="Done" className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg" />
			</div>
			<DragOverlay>
				{activeTask ? (
					<div className="bg-white rounded-lg shadow-2xl p-4 border border-gray-200 w-[300px]">
						<p className="text-gray-700 text-lg font-medium line-clamp-2">{activeTask.text}</p>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};
