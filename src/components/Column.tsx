import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../types/types";
import { TaskCard } from "./TaskCard";

export interface ColumnProps {
	title: string;
	tasks: Task[];
	className?: string;
}
export const Column = ({ title, tasks, className }: ColumnProps) => {
	const { isOver, setNodeRef } = useDroppable({
		id: `${title}`,
	});
	const style = {
		color: isOver ? "green" : undefined,
	};

	return (
		<div style={style} ref={setNodeRef} className={`board-column rounded-2xl p-4 min-w-92 min-h-120 ${className ? className.split(" ").filter(Boolean).join(" ").trim() : ""}`}>
			<h2 className="text-2xl font-medium mb-5 mt-1">{title}</h2>
			<ul className="my-3 border-neutral-200 border rounded-lg px-1 py-2">
				{tasks.map((task) => (
					<TaskCard task={task} key={task.id} />
				))}
			</ul>
		</div>
	);
};
