import { AddTaskForm } from "./components/AddTaskForm";
import { Board } from "./components/Board";
import { Header } from "./components/Header";

function App() {
	return (
		<>
			<div className="bg-gradient-to-b from-indigo-950 to-blue-900 h-full flex flex-col">
				<Header className="sticky backdrop-blur-sm mt-4 mx-2 border border-gray-700 rounded-lg text-blue-400 px-3 py-2 " />
				<AddTaskForm className="p-4 my-8 flex items-center justify-between w-1/2 mx-auto min-h-32 rounded-xl bg-gray-100 shadow-sm shadow-gray-100" />
				<Board />
			</div>
		</>
	);
}

export default App;
