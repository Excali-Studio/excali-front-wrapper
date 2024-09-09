import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ModalProps = { selectedId: string } | undefined;

interface ModalState {
	isModalOpen: boolean;
	closeModal: () => void;
	openModal: (ModalPayload: ModalPayload) => void;
	modalState: ModalStateUnion | undefined;
	resetState: () => void;
	modalProps: ModalProps;
}

export const MODAL_STATE = {
	ADD_TAG: 'ADD_TAG',
	EDIT_TAG: 'EDIT_TAG',
	REMOVE_TAG: 'REMOVE_TAG',
} as const;

export type ModalStateUnion = (typeof MODAL_STATE)[keyof typeof MODAL_STATE];

export type ModalStateKeys = keyof typeof MODAL_STATE;

const initialState = {
	isModalOpen: false,
	selectedId: null,
	modalState: undefined,
	modalProps: undefined,
};

export type ModalPayload =
	| {
			modalState: typeof MODAL_STATE.EDIT_TAG | typeof MODAL_STATE.REMOVE_TAG;
			params: ModalProps;
	  }
	| {
			modalState: typeof MODAL_STATE.ADD_TAG;
	  };

const useModalStore = create<ModalState, [['zustand/immer', never]]>(
	immer((set) => ({
		...initialState,
		openModal: (modalPayload) =>
			set((state) => {
				state.isModalOpen = true;
				state.modalState = modalPayload.modalState;
				if ('params' in modalPayload) {
					state.modalProps = modalPayload.params;
				}
			}),
		closeModal: () => {
			set({ isModalOpen: false });
		},
		resetState: () => {
			set(initialState);
		},
	}))
);

export { useModalStore };
