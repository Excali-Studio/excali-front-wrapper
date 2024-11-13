import { useCallback, useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import {
	SocketId,
	SocketUpdateData,
	SocketUpdateDataSource,
	WS_EVENTS,
	WS_SUBTYPES,
} from '@/lib/collab/types';
import {
	Collaborator,
	ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';
import { Mutable } from '@excalidraw/excalidraw/types/utility-types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { arrayToMap } from '@/lib/utils';
import { getSceneVersion } from '@excalidraw/excalidraw';
import { useSyncVersions } from '@/hooks/useSyncVersions';
import { useUserAuth } from '@/lib/useUserAuth';

type SyncHook = ReturnType<typeof useSyncVersions>;
type LastSyncSceneVersion = SyncHook['lastSyncSceneVersion'];
type SyncElementVersions = SyncHook['syncElementVersions'];

type CollaboratorsMap = Map<string, Collaborator>;

export function useCollabSocket(
	excalidrawApi: ExcalidrawImperativeAPI | null,
	roomId: string | undefined,
	syncElementVersions: SyncElementVersions,
	lastSyncSceneVersion: LastSyncSceneVersion
) {
	const { data: user } = useUserAuth();
	const [socket, setSocket] = useState<Socket>();
	const [collaborators, setCollaborators] = useState<CollaboratorsMap>(
		new Map()
	);

	useEffect(() => {
		console.log('WS Effect trigger', { socket, excalidrawApi });

		if (!socket && excalidrawApi) {
			function onInitRoom() {
				if (socket) socket.emit('join-room', roomId);
			}

			function onClientBroadcast(encryptedData: ArrayBuffer) {
				const rawDecodedData = new TextDecoder('utf-8').decode(
					new Uint8Array(encryptedData)
				);
				const decodedData: SocketUpdateData = JSON.parse(rawDecodedData);

				switch (decodedData.type) {
					case WS_SUBTYPES.MOUSE_LOCATION: {
						const { pointer, button, username, selectedElementIds } =
							decodedData.payload;

						const socketId: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['socketId'] =
							decodedData.payload.socketId;

						updateCollaborator(socketId, {
							pointer,
							button,
							selectedElementIds,
							username,
						});

						break;
					}
					case WS_SUBTYPES.UPDATE: {
						reconcileAndUpdateCanvas(decodedData.payload.elements);
						break;
					}
					default: {
						console.log(`UNHANDLED EVENT: ${decodedData.type}`);
					}
				}
			}

			const socket = socketIOClient(import.meta.env.VITE_APP_WS_SERVER_URL, {
				transports: ['websocket', 'polling'],
			});

			console.log('socket-connection inside effect', socket);

			setSocket(socket);

			if (socket && excalidrawApi) {
				socket.on('init-room', onInitRoom);
				socket.on('client-broadcast', onClientBroadcast);
			}

			return () => {
				socket?.close();
				setSocket(undefined);
				socket?.off('init-room', onInitRoom);
				socket?.off('client-broadcast', onClientBroadcast);
			};
		}
	}, [excalidrawApi]);

	const broadcastSocketData = useCallback(
		(data: SocketUpdateData, volatile: boolean = false) => {
			if (socket && roomId) {
				const json = JSON.stringify(data);
				const encoded = new TextEncoder().encode(json);

				socket.emit(
					volatile ? WS_EVENTS.SERVER_VOLATILE : WS_EVENTS.SERVER,
					roomId,
					encoded
				);
			} else {
				console.error('Failed try to broadcast data');
			}
		},
		[socket, roomId]
	);

	const updateCollaborator = useCallback(
		(socketId: SocketId, updates: Partial<Collaborator>) => {
			const updatedCollaborators = new Map(collaborators);
			const user: Mutable<Collaborator> = Object.assign(
				{},
				updatedCollaborators.get(socketId),
				updates
			);
			updatedCollaborators.set(socketId, user);
			setCollaborators(updatedCollaborators);

			excalidrawApi?.updateScene({
				collaborators: updatedCollaborators,
			});
		},
		[collaborators, excalidrawApi]
	);

	const reconcileAndUpdateCanvas = useCallback(
		(networkElements: ExcalidrawElement[]) => {
			if (!excalidrawApi)
				return console.error(
					'Unable to reconcile elements, ExcaliApi is missing'
				);

			const elements = excalidrawApi.getSceneElementsIncludingDeleted();
			const elementsMap = arrayToMap(elements);

			for (const element of networkElements) {
				const relableLocalElement = elementsMap.get(element.id);
				if (!relableLocalElement) {
					elementsMap.set(element.id, element);
				} else if (element.updated > relableLocalElement?.updated) {
					elementsMap.set(element.id, element);
					syncElementVersions.current.set(element.id, element.updated);
				}
			}

			excalidrawApi.updateScene({
				elements: [...elementsMap.values()],
			});
			lastSyncSceneVersion.current = getSceneVersion([...elementsMap.values()]);
		},
		[excalidrawApi, lastSyncSceneVersion, syncElementVersions]
	);

	const broadcastMouseLocation = useCallback(
		(payload: {
			pointer: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['pointer'];
			button: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['button'];
		}) => {
			if (socket?.id && excalidrawApi) {
				const data: SocketUpdateDataSource['MOUSE_LOCATION'] = {
					type: WS_SUBTYPES.MOUSE_LOCATION,
					payload: {
						socketId: socket.id as SocketId,
						pointer: payload.pointer,
						button: payload.button || 'up',
						selectedElementIds: excalidrawApi?.getAppState().selectedElementIds,
						username: user?.displayName || 'Unknown user',
					},
				};

				return broadcastSocketData(
					data,
					true // volatile
				);
			} else {
				console.error('Failed attempt to broadcast mouse location', {
					socket,
					socketId: socket?.id,
					excalidrawApi,
				});
			}
		},
		[broadcastSocketData, excalidrawApi, socket, user?.displayName]
	);

	const broadcastCanvas = useCallback(
		(elements: readonly ExcalidrawElement[]) => {
			const syncableElements = elements.reduce<ExcalidrawElement[]>(
				(acc, curr) => {
					const element = syncElementVersions.current.get(curr.id);

					if (!element || curr.updated > element) {
						acc.push(curr);
					}

					return acc;
				},
				[]
			);

			const data: SocketUpdateDataSource['SCENE_UPDATE'] = {
				type: WS_SUBTYPES.UPDATE,
				payload: { elements: syncableElements },
			};

			for (const syncElement of syncableElements) {
				syncElementVersions.current.set(syncElement.id, syncElement.updated);
			}

			broadcastSocketData(data);
		},
		[broadcastSocketData, syncElementVersions]
	);

	return { socket, broadcastMouseLocation, broadcastCanvas };
}
