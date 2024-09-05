import { ExcaliApi } from '@/lib/api/excali-api';
import { useTagsFilterStore } from '@/providers/TagsFilterProvider/TagsFilterProvider';
import { useQuery } from '@tanstack/react-query';
import { ComboBox } from '@/components/ComboBox';

export function SelectTags() {
	const { selectedTags, onSelect, getSelectedTagsName } = useTagsFilterStore(
		(s) => s
	);

	const { data = [] } = useQuery({
		queryKey: ['tags'],
		queryFn: ExcaliApi.getCanvasTags,
	});

	const tags = data.map((tag) => ({
		label: tag.name,
		value: tag.id,
	}));

	console.log({ xd: data });

	const selectedLabel = getSelectedTagsName(data);

	return (
		<ComboBox
			field="tags"
			data={tags}
			selectedData={selectedTags}
			selectedValueLabel={selectedLabel}
			onSelect={onSelect}
		/>
	);
}
