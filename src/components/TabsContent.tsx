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
import EditCanvasDialog from '@/components/EditCanvasDialog';
import { useModalStore } from '@/store/modalStore';

interface TabsContentProps {
	title: string;
	description?: string;
}

export const CANVASES_QUERY_KEY = 'canvases';

export default function TabsContentWrapper({
	description,
	title,
}: TabsContentProps) {
	const { closeModal, modalProps, isModalOpen, modalState } = useModalStore();

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
						<ContentTable canvasData={canvasData} isLoading={isLoading} />
					</CardContent>
				</Card>
			</TabsContent>
			<TagsFilterStoreProvider>
				{modalState === 'EDIT_CANVAS' && (
					<EditCanvasDialog
						isOpen={isModalOpen}
						canvasId={modalProps?.selectedId || null}
						onClose={closeModal}
					/>
				)}
			</TagsFilterStoreProvider>
		</>
	);
}
