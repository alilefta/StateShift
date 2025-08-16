import { AddTaskForm } from "./components/AddTaskForm";
import { Board } from "./components/Board";
import { Header } from "./components/Header";
import { BoardProvider } from "./store/BoardProvider";

function App() {
	return (
		<BoardProvider>
			<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900">
				<Header />
				<main className="container mx-auto px-4 py-8">
					<AddTaskForm className="mb-12 max-w-4xl mx-auto" />
					<Board />
				</main>
			</div>
		</BoardProvider>
	);
}

export default App;
