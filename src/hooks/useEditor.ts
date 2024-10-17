import { useMutation } from '@tanstack/react-query';
import { CanvasStateUpdateDTO, ExcaliApi } from '@/lib/api/excali-api';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
	AppState,
	BinaryFiles,
	ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { getSceneVersion } from '@excalidraw/excalidraw';
import { useGetCanvasState } from '@/hooks/useGetCanvasState';
import { useSyncVersions } from '@/hooks/useSyncVersions';
import { useCollabSocket } from '@/hooks/useCollabSocket';

const MOUSE_BROADCAST_DEBOUCE =
	import.meta.env.VITE_USER_MOUSE_SYNC_THROTTLE || 33; // ~30fps

const CANVAS_STATE_SAVE_DEBOUNCE_TIMEOUT =
	import.meta.env.VITE_CANVAS_STATE_SAVE_DEBOUNCE_TIMEOUT || 300;

export function useEditor(excalidrawApi: ExcalidrawImperativeAPI | null) {
	const params = useParams();

	const { syncElementVersions, lastSyncSceneVersion } = useSyncVersions();

	const { data } = useGetCanvasState(params.canvasId);

	const { broadcastCanvas, broadcastMouseLocation } = useCollabSocket(
		excalidrawApi,
		params.canvasId,
		syncElementVersions,
		lastSyncSceneVersion
	);

	const { mutate: updateCanvas } = useMutation({
		mutationFn: (updateData: CanvasStateUpdateDTO) =>
			ExcaliApi.updateCanvasState(`${params.canvasId}`, updateData),
		onError: console.error,
	});

	const updateCanvasStateInDb = debounce(
		(newCanvasState: CanvasStateUpdateDTO) => {
			updateCanvas(newCanvasState);
		},
		CANVAS_STATE_SAVE_DEBOUNCE_TIMEOUT
	);

	const updateCanvasState = useCallback(
		(
			elements: readonly ExcalidrawElement[],
			appState: AppState,
			files: BinaryFiles
		): void => {
			const sceneVersion = getSceneVersion(elements);

			if (sceneVersion > lastSyncSceneVersion.current) {
				lastSyncSceneVersion.current = sceneVersion;

				broadcastCanvas(elements);

				//Trigger update only when changes to the element or files were detected
				console.log('Saving canvas state: ', elements, appState, files);

				const newCanvasState: CanvasStateUpdateDTO = {
					elements: elements as ExcalidrawElement[],
					appState,
					files,
				};

				updateCanvasStateInDb(newCanvasState);
			} else {
				console.log('Skipping save, no significant changes detected');
			}
		},
		[broadcastCanvas, lastSyncSceneVersion, updateCanvasStateInDb]
	);

	const debouncedPointerHandler = useMemo(
		() => throttle(broadcastMouseLocation, MOUSE_BROADCAST_DEBOUCE),
		[broadcastMouseLocation]
	);

	const debouncedChangeHandler = useMemo(
		() => throttle(updateCanvasState, MOUSE_BROADCAST_DEBOUCE),
		[updateCanvasState]
	);

	return {
		canvasState: data?.canvasState,
		loadedCanvas: data?.loadedCanvas,
		debouncedChangeHandler,
		debouncedPointerHandler,
	};
}
