import { Action } from "redux";

export type State = {
	isOpen: boolean;
};

export type OpenModalAction = Action<"@modal/openModal">;

export type CloseModalAction = Action<"@modal/closeModal">;

export type Actions = OpenModalAction | CloseModalAction;
