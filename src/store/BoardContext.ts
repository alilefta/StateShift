import type { BoardState, ColumnType } from "@/types/types";
import { createContext } from "react";

export interface BoardContextType {
	boardState: BoardState;
	dispatch: (action: BoardActions) => void;
}

export type BoardActions =
	| { type: "ADD_TASK"; payload: { text: string; status: ColumnType; title?: string } }
	| { type: "UPDATE_TASK"; payload: { taskId: string; text: string; status: ColumnType } }
	| { type: "DELETE_TASK"; payload: { taskId: string } }
	| { type: "MOVE_TASK"; payload: { taskId: string; toColumn: ColumnType; overId?: string } };

export const BoardContext = createContext<BoardContextType | null>(null);
