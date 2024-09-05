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
import { useTranslation } from 'react-i18next';

const CANVAS_TAGS_KEY = 'canvas-tags';

export function TagsContent() {
	const { t } = useTranslation();
	const { data: tags, isLoading } = useQuery({
		queryKey: [CANVAS_TAGS_KEY],
		queryFn: () => ExcaliApi.getCanvasTags(),
	});

	return (
		<>
			<TabsContent value="all">
				<Card x-chunk="dashboard-06-chunk-0">
					<CardHeader>
						<CardTitle>{t('components.tagsContent.title')}</CardTitle>
						<CardDescription>{t('components.tagsContent.description')}</CardDescription>
					</CardHeader>
					<CardContent>
						<TagsTable tags={tags} isLoading={isLoading} />
					</CardContent>
				</Card>
			</TabsContent>
		</>
	);
}
