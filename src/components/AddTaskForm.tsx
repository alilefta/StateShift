import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ColumnType, Task } from "@/types/types";
import { useSetAtom } from "jotai";
import { doneAtom, inProgressAtom, tasksMapAtom, todoAtom } from "@/store/atoms";

export const AddTaskForm = ({ className }: { className?: string }) => {
	const [taskText, setTaskText] = useState("");
	const [selectedColumn, setSelectedColumn] = useState<ColumnType>("todo");

	const setTodos = useSetAtom(todoAtom);
	const setInProgress = useSetAtom(inProgressAtom);
	const setDone = useSetAtom(doneAtom);

	const setTaskMapper = useSetAtom(tasksMapAtom);

	return (
		<form
			className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl
                ${className ? className.split(" ").filter(Boolean).join(" ").trim() : ""}`}
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();
			}}
		>
			<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div className="flex-1 space-y-2">
					<Label className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent" htmlFor="task-input-form">
						Plan a Task
					</Label>
					<Input
						className="mt-2 py-6 bg-white/5 border-white/20 text-white placeholder:text-white/50
                            focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
						id="task-input-form"
						type="text"
						value={taskText}
						onChange={(e) => {
							setTaskText(e.currentTarget.value);
						}}
						placeholder="E.g., Read a textbook in Physics"
					/>
				</div>

				<div className="flex items-center gap-3">
					<Select
						value={selectedColumn}
						onValueChange={(val: string) => {
							setSelectedColumn(val as ColumnType);
						}}
					>
						<SelectTrigger
							className="w-[160px] bg-white/5 border-white/20 text-white 
                                hover:bg-white/10 transition-colors duration-300"
						>
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent className="bg-gray-900/95 border-white/20">
							<SelectItem value="todo" className="text-white hover:bg-white/10">
								Todo
							</SelectItem>
							<SelectItem value="inProgress" className="text-white hover:bg-white/10">
								In-Progress
							</SelectItem>
							<SelectItem value="done" className="text-white hover:bg-white/10">
								Done
							</SelectItem>
						</SelectContent>
					</Select>

					<Button
						className="py-6 px-8 bg-gradient-to-r from-blue-500 to-violet-500 
                            hover:from-blue-600 hover:to-violet-600 text-white font-semibold
                            shadow-lg shadow-blue-500/25 transition-all duration-300
                            hover:shadow-xl hover:shadow-blue-500/30"
						type="button"
						onClick={() => {
							if (!taskText.trim()) return;

							const task: Task = {
								id: uuidv4(),
								text: taskText,
							};

							switch (selectedColumn) {
								case "todo":
									setTodos((prev) => [...prev, task.id]);
									break;
								case "inProgress":
									setInProgress((prev) => [...prev, task.id]);
									break;
								case "done":
									setDone((prev) => [...prev, task.id]);
									break;
							}

							setTaskMapper((prev) => ({ ...prev, [task.id]: task }));
							setTaskText("");
							setSelectedColumn("todo");
						}}
					>
						Add Task
					</Button>
				</div>
			</div>
		</form>
	);
};
