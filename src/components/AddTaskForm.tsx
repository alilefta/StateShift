import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AddTaskForm = ({ className }: { className?: string }) => {
	const [taskText, setTaskText] = useState("");
	const [selectedColumn, setSelectedColumn] = useState("todo");

	const addTask = () => {
		console.log("New Task:", taskText, "Selected Column:", selectedColumn);
	};

	return (
		<form
			className={`${className ? className.split(" ").filter(Boolean).join(" ").trim() : ""}`}
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();
			}}
		>
			<div className="form-control lg:w-200">
				<Label className="text-xl font-bold text-gray-800" htmlFor="task-input-form">
					Plan a Task
				</Label>
				<Input
					className="mt-4 py-5 border-gray-600"
					id="task-input-form"
					type="text"
					value={taskText}
					onChange={(e) => {
						setTaskText(e.currentTarget.value);
					}}
					placeholder="E.g., Read a textbook in Physics"
				/>
			</div>

			<Select
				value={selectedColumn}
				onValueChange={(val: string) => {
					setSelectedColumn(val);
				}}
			>
				<SelectTrigger className="w-[180px] ml-4 mb-2 mt-auto" size={"default"}>
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="todo">Todo</SelectItem>
					<SelectItem value="in-progress">In-Progress</SelectItem>
					<SelectItem value="done">Done</SelectItem>
				</SelectContent>
			</Select>

			<Button className="ml-4 mb-2 py-5 mt-auto cursor-pointer" type="button" size={"lg"} onClick={addTask}>
				Add Task
			</Button>
		</form>
	);
};
