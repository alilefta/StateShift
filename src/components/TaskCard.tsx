import { useState } from "react";
import type { Task, TaskStatus } from "../types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
	task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
	const [selectedColumn, setSelectedColumn] = useState<TaskStatus>(task.status);
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="task-card mb-3 last:mb-1 first:mt-1 bg-neutral-100 cursor-grab text-gray-600 py-3 px-4 rounded-xl shadow-sm hover:transform hover:transform-gpu hover:translate-px"
		>
			<div className="flex items-center justify-between my-1">
				<h3 className="text-2xl font-medium">{task.title}</h3>
				<Select
					value={selectedColumn}
					onValueChange={(val) => {
						setSelectedColumn(val as TaskStatus);
					}}
				>
					<SelectTrigger className="ml-4 mb-2 mt-auto" size={"default"}>
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="todo">Todo</SelectItem>
						<SelectItem value="in-progress">In-Progress</SelectItem>
						<SelectItem value="done">Done</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<p className="text-base mt-2">{task.text}</p>
		</li>
	);
};
