import { useForm } from 'react-hook-form';
import {
	editCanvasFormSchema,
	EditCanvasFormSchema,
} from '@/schema/edit-canvas.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api.ts';
import { useEffect } from 'react';
import { useEditCanvas } from '@/hooks/useEditCanvas.ts';

export function useEditCanvasForm(
	canvasId: string | null,
	onClose: () => void
) {
	const { data: tagsData = [] } = useQuery({
		queryKey: ['tags'],
		queryFn: ExcaliApi.getCanvasTags,
	});

	const tags = tagsData.map((tag) => ({
		value: tag.id,
		label: tag.name,
	}));

	const form = useForm<EditCanvasFormSchema>({
		resolver: zodResolver(editCanvasFormSchema),
		defaultValues: {
			name: '',
			selectedTags: [],
		},
	});

	const { data } = useQuery({
		queryKey: ['canvas', canvasId],
		queryFn: () => ExcaliApi.getCanvasById(`${canvasId}`),
		enabled: Boolean(canvasId),
	});

	useEffect(() => {
		if (data) {
			form.setValue('name', data.name);
			form.setValue(
				'selectedTags',
				data.tags.map((tag) => tag.id)
			);
		}
	}, [data, form]);

	function onSelect(value: string) {
		const selected = form.getValues('selectedTags');
		if (selected.includes(value)) {
			form.setValue(
				'selectedTags',
				selected.filter((tag) => tag !== value)
			);
		} else {
			form.setValue('selectedTags', [...selected, value]);
		}
	}

	const { mutate } = useEditCanvas(data, `${canvasId}`, onClose);

	const onSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	const selectedTagsName = form
		.watch('selectedTags')
		.map((tag) => tags.find((t) => t.value === tag)?.label)
		.join(', ');

	return { form, onSubmit, onSelect, selectedTagsName, tags };
}
