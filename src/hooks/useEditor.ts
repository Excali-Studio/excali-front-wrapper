import { useMutation, useQuery } from '@tanstack/react-query';
import { CanvasStateUpdateDTO, ExcaliApi } from '@/lib/api/excali-api.ts';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
	AppState,
	BinaryFiles,
	ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types/types';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export function useEditor() {
	const params = useParams();

	const lastCanvasState = useRef<ExcalidrawInitialDataState>();

	const { data } = useQuery({
		queryKey: ['canvas', params.canvasId],
		queryFn: async () => {
			const [canvasState, loadedCanvas] = await Promise.all([
				ExcaliApi.getCanvasState(`${params.canvasId}`),
				ExcaliApi.getCanvasById(`${params.canvasId}`),
			]);

			return { canvasState, loadedCanvas };
		},
		enabled: Boolean(params.canvasId),
	});

	const { mutate: updateCanvas } = useMutation({
		mutationFn: (updateData: CanvasStateUpdateDTO) =>
			ExcaliApi.updateCanvasState(`${params.canvasId}`, updateData),
		onError: console.error,
	});

	const updateCanvasState = (
		elements: ExcalidrawElement[],
		appState: AppState,
		files: BinaryFiles
	): void => {
		//Trigger update only when changes to the element or files were detected
		if (
			elements !== lastCanvasState.current?.elements ||
			files !== lastCanvasState.current?.files
		) {
			console.log('Saving canvas state: ', elements, appState, files);

			const newCanvasState: CanvasStateUpdateDTO = {
				elements,
				appState,
				files,
			};
			lastCanvasState.current = newCanvasState;
			updateCanvas(newCanvasState);
		} else {
			console.log('Skipping save, no significant changes detected');
		}
	};

	const debouncedChangeHandler = useMemo(
		() =>
			debounce(
				updateCanvasState,
				import.meta.env.VITE_CANVAS_STATE_SAVE_DEBOUNCE_TIMEOUT
			),
		[]
	);

	return {
		canvasState: data?.canvasState,
		loadedCanvas: data?.loadedCanvas,
		debouncedChangeHandler,
	};
}
