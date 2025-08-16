import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "../types/types";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
	task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={`flex items-start justify-between mb-3 last:mb-1 first:mt-1 
                bg-white rounded-lg shadow-lg p-4 
                hover:shadow-xl transition-all duration-300 ease-in-out
                border border-gray-100
                ${isDragging ? "opacity-0" : "opacity-100"}`}
		>
			<p className="text-gray-700 text-lg font-medium line-clamp-2">{task.text}</p>

			<div className="flex flex-col items-end h-full justify-between gap-2">
				<Button {...listeners} size={"icon"} variant={"ghost"} className="cursor-move hover:bg-gray-100 transition-colors duration-200">
					<Menu className="size-5" />
				</Button>
				<Button className="hover:bg-red-50 transition-colors duration-200" size={"icon"} variant={"ghost"} onClick={() => {}}>
					<X className="text-red-500 hover:text-red-600" />
				</Button>
			</div>
		</li>
	);
};
