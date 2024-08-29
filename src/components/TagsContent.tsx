import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';
import { TabsContent } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { TagsTable } from '@/components/TagsTable';

const CANVAS_TAGS_KEY = 'canvas-tags';

interface TagsContentProps {
	setCurrentTagId: (tagId: string | null) => void;
}

export function TagsContent({ setCurrentTagId }: TagsContentProps) {
	const { data: tags, isLoading } = useQuery({
		queryKey: [CANVAS_TAGS_KEY],
		queryFn: () => ExcaliApi.getCanvasTags(),
	});

	return (
		<>
			<TabsContent value="all">
				<Card x-chunk="dashboard-06-chunk-0">
					<CardHeader>
						<CardTitle>Tags</CardTitle>
						<CardDescription>All canvas tag list</CardDescription>
					</CardHeader>
					<CardContent>
						<TagsTable
							tags={tags}
							isLoading={isLoading}
							setCurrentTagId={setCurrentTagId}
						/>
					</CardContent>
				</Card>
			</TabsContent>
		</>
	);
}
