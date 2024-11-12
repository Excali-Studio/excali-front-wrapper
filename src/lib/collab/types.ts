import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

export type SocketUpdateDataSource = {
	INVALID_RESPONSE: {
		type: WS_SUBTYPES.INVALID_RESPONSE;
	};
	SCENE_INIT: {
		type: WS_SUBTYPES.INIT;
		payload: {
			elements: readonly ExcalidrawElement[];
		};
	};
	SCENE_UPDATE: {
		type: WS_SUBTYPES.UPDATE;
		payload: {
			elements: ExcalidrawElement[];
		};
	};
	MOUSE_LOCATION: {
		type: WS_SUBTYPES.MOUSE_LOCATION;
		payload: {
			socketId: SocketId;
			pointer: { x: number; y: number; tool: 'pointer' | 'laser' };
			button: 'down' | 'up';
			selectedElementIds: AppState['selectedElementIds'];
			username: string;
		};
	};
};

export type SocketUpdateData =
	SocketUpdateDataSource[keyof SocketUpdateDataSource];

export const WS_EVENTS = {
	SERVER_VOLATILE: 'server-volatile-broadcast',
	SERVER: 'server-broadcast',
	USER_FOLLOW_CHANGE: 'user-follow',
	USER_FOLLOW_ROOM_CHANGE: 'user-follow-room-change',
} as const;

export enum WS_SUBTYPES {
	INVALID_RESPONSE = 'INVALID_RESPONSE',
	INIT = 'SCENE_INIT',
	UPDATE = 'SCENE_UPDATE',
	MOUSE_LOCATION = 'MOUSE_LOCATION',
	IDLE_STATUS = 'IDLE_STATUS',
	USER_VISIBLE_SCENE_BOUNDS = 'USER_VISIBLE_SCENE_BOUNDS',
}

export type SocketId = string & { _brand: 'SocketId' };
