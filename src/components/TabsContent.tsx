import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import ContentTable from '@/components/ContentTable';
import { ExcaliApi } from '@/lib/api/excali-api';
import { TabsContent } from '@/components/ui/tabs';
import {
	TagsFilterStoreProvider,
	useTagsFilterStore,
} from '@/providers/TagsFilterProvider/TagsFilterProvider';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditCanvasDialog from '@/components/EditCanvasDialog';

interface TabsContentProps {
	title: string;
	description?: string;
}

export const CANVASES_QUERY_KEY = 'canvases';

type CanvasIdValue = string | null;

export default function TabsContentWrapper({
	description,
	title,
}: TabsContentProps) {
	const [editCanvasId, setEditCanvasId] = useState<CanvasIdValue>(null);

	const selectedTags = useTagsFilterStore((s) => s.selectedTags);

	const { data: canvasData, isLoading } = useQuery({
		queryKey: [CANVASES_QUERY_KEY, selectedTags],
		queryFn: () => ExcaliApi.getCanvases(selectedTags),
	});

	return (
		<>
			<TabsContent value="all">
				<Card x-chunk="dashboard-06-chunk-0">
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						<ContentTable
							canvasData={canvasData}
							setEditCanvasId={setEditCanvasId}
							isLoading={isLoading}
						/>
					</CardContent>
				</Card>
			</TabsContent>
			<TagsFilterStoreProvider>
				<EditCanvasDialog
					canvasId={editCanvasId}
					onClose={() => setEditCanvasId(null)}
				/>
			</TagsFilterStoreProvider>
		</>
	);
}
