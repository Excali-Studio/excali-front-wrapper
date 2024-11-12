import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';

export function useGetCanvasById(canvasId: string) {
	return useQuery({
		queryKey: ['canvas', canvasId],
		queryFn: () => ExcaliApi.getCanvasById(`${canvasId}`),
		enabled: Boolean(canvasId),
	});
}
