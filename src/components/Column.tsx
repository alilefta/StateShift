import { useDroppable } from "@dnd-kit/core";
import type { ColumnType, Task } from "../types/types";
import { TaskCard } from "./TaskCard";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

export interface ColumnProps {
	title: string;
	tasks: Task[];
	className?: string;
	id: ColumnType;
}
export const Column = ({ title, id, tasks, className }: ColumnProps) => {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			type: "Column",
			accepts: ["Task"],
		},
	});

	return (
		<div className={`rounded-xl backdrop-blur-sm p-5 min-w-[300px] min-h-[500px] ${className ?? ""}`}>
			<h2 className="text-2xl font-bold mb-6 mt-1">{title}</h2>
			<ul
				ref={setNodeRef}
				className={`my-3 bg-white/10 backdrop-blur-lg border-2 
                    ${isOver ? "border-white/50" : "border-white/20"} 
                    rounded-xl px-3 
                    flex items-stretch flex-col justify-start py-3 min-h-[400px] 
                    transition-all duration-300 ease-in-out`}
			>
				<SortableContext items={tasks.map((t) => t.id)} strategy={rectSortingStrategy}>
					{tasks && tasks.length > 0 ? (
						tasks.map((task) => <TaskCard task={task} key={task.id} />)
					) : (
						<li className="flex items-center justify-center h-full">
							<p className="text-white/70 text-lg font-medium">Drop tasks here</p>
						</li>
					)}
				</SortableContext>
			</ul>
		</div>
	);
};
