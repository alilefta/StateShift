import type { Task } from "@/types/types";
import { Column } from "./Column";
import { v4 as uuidv4 } from "uuid";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

let todoTasks: Task[] = [
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "todo" },
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "todo" },
];

let inProgressTasks: Task[] = [
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "in-progress" },
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "in-progress" },
];

let doneTasks: Task[] = [
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "done" },
	{ id: uuidv4(), title: "Learn React", text: "I want to learn React asap!", status: "done" },
];

export const Board = () => {
	const handleDragEnd = (event: DragEndEvent) => {
		if (event.over && event.over.id === "Todo") {
			// const taskId = event.active.id;
			// const targetCol = "todo";
			// let fromCol = "";
			const taskInProgressCol = inProgressTasks.find((task) => task.id === event.active.id);
			if (taskInProgressCol) {
				// fromCol = "in-progress";
				taskInProgressCol.status = "todo";
				todoTasks = [...todoTasks, taskInProgressCol];
				inProgressTasks.filter((task) => task.id !== taskInProgressCol.id);
			}
			const taskInDoneCol = doneTasks.find((task) => task.id === event.active.id);
			if (taskInDoneCol) {
				// fromCol = "done";
				taskInDoneCol.status = "todo";
				todoTasks = [...todoTasks, taskInDoneCol];
				doneTasks.filter((task) => task.id !== taskInDoneCol.id);
			}

			// console.log("fromCol:", fromCol);
		} else if (event.over && event.over.id === "In-progress") {
			const taskInTodoCol = todoTasks.find((task) => task.id === event.active.id);

			if (taskInTodoCol) {
				taskInTodoCol.status = "in-progress";
				inProgressTasks = [...inProgressTasks, taskInTodoCol];
				todoTasks.filter((task) => task.id !== taskInTodoCol.id);
				return;
			}

			const taskInDoneCol = doneTasks.find((task) => task.id === event.active.id);
			if (taskInDoneCol) {
				taskInDoneCol.status = "in-progress";
				inProgressTasks = [...inProgressTasks, taskInDoneCol];
				doneTasks.filter((task) => task.id !== taskInDoneCol.id);
				return;
			}
		} else if (event.over && event.over.id === "Done") {
			const taskInTodoCol = todoTasks.find((task) => task.id === event.active.id);

			if (taskInTodoCol) {
				taskInTodoCol.status = "done";
				doneTasks = [...doneTasks, taskInTodoCol];
				todoTasks.filter((task) => task.id !== taskInTodoCol.id);
				return;
			}

			const taskInProgressCol = inProgressTasks.find((task) => task.id === event.active.id);
			if (taskInProgressCol) {
				taskInProgressCol.status = "done";
				doneTasks = [...doneTasks, taskInProgressCol];
				inProgressTasks.filter((task) => task.id !== taskInProgressCol.id);
				return;
			}
		}
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="board grid lg:grid-cols-3 gap-4 mx-5 grid-cols-1 md:grid-cols-2 my-2">
				<Column tasks={todoTasks} title="Todo" className="bg-amber-500 text-neutral-100" />
				<Column tasks={inProgressTasks} title="In-progress" className="bg-indigo-500 text-neutral-100" />
				<Column tasks={doneTasks} title="Done" className="bg-emerald-500 text-neutral-100" />
			</div>
		</DndContext>
	);
};
