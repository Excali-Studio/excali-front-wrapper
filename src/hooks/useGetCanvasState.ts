import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';

export function useGetCanvasState(canvasId: string | undefined) {
	return useQuery({
		queryKey: ['canvas', canvasId],
		queryFn: async () => {
			const [canvasState, loadedCanvas] = await Promise.all([
				ExcaliApi.getCanvasState(`${canvasId}`),
				ExcaliApi.getCanvasById(`${canvasId}`),
			]);

			return { canvasState, loadedCanvas };
		},
		enabled: Boolean(canvasId),
	});
}
