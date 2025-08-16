import { use } from "react";
import { BoardContext } from "./BoardContext";

export const useBoardContext = () => {
	const context = use(BoardContext);

	if (!context) {
		throw new Error("useBoardContext must be used within BoardContext");
	}

	return context;
};
