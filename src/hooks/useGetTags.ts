import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';

export function useGetTags() {
	const { data = [] } = useQuery({
		queryKey: ['tags'],
		queryFn: ExcaliApi.getCanvasTags,
	});

	return {
		tags: data.map((tag) => ({
			value: tag.id,
			label: tag.name,
		})),
	};
}
