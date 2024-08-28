import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditCanvasFormSchema } from '@/schema/edit-canvas.ts';
import { CanvasDTO, ExcaliApi } from '@/lib/api/excali-api.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { CANVASES_QUERY_KEY } from '@/components/TabsContent.tsx';

export function useEditCanvas(
	canvasData: CanvasDTO | undefined,
	canvasId: string,
	clearCanvasId: () => void
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: EditCanvasFormSchema) => {
			const toRemove = canvasData?.tags
				.filter(
					(original) => !values.selectedTags.some((tag) => tag === original.id)
				)
				.map((tag) => tag.id);

			const toAdd = values.selectedTags.filter(
				(tag) => !canvasData?.tags.some((original) => original.id === tag)
			);

			return Promise.all([
				ExcaliApi.updateCanvasMetadata(`${canvasId}`, {
					name: values.name,
				}),
				toRemove?.length
					? ExcaliApi.removeTagFromCanvas(`${canvasId}`, toRemove)
					: undefined,
				toAdd.length
					? ExcaliApi.addTagToCanvas(`${canvasId}`, toAdd)
					: undefined,
			]);
		},
		onSuccess: () => {
			clearCanvasId();
			toast({
				description: 'Canvas updated successfully',
			});
			return queryClient.invalidateQueries({ queryKey: [CANVASES_QUERY_KEY] });
		},
		onError: () => {
			clearCanvasId();
			toast({
				description: 'An error occurred',
			});
		},
	});
}
