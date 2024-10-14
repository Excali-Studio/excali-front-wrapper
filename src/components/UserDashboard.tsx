import { PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { ExcaliApi } from '@/lib/api/excali-api';
import CreateCanvasDialog from '@/components/CreateCanvasDialog';
import { useUserAuth } from '@/lib/useUserAuth';
import { z } from 'zod';
import { createCanvasFormSchema } from '@/schema/createcanvas';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import PrimaryActionButton from '@/components/buttons/PrimaryActionButton';
import TabsContentWrapper, {
	CANVASES_QUERY_KEY,
} from '@/components/TabsContent';
import ContentWrapper from '@/components/ContentWrapper';
import DashboardFilters from '@/components/DashboardFilters';
import { TagsFilterStoreProvider } from '@/providers/TagsFilterProvider/TagsFilterProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShareCanvasDialog } from '@/components/ShareCanvasDialog';
import { useModalStore } from '@/store/modalStore';

export default function UserDashboard() {
	const { data } = useUserAuth();
	const { toast } = useToast();
	const { t } = useTranslation();

	const queryClient = useQueryClient();

	const {
		isModalOpen,
		modalState,
		modalProps,
		closeModal,
		resetState,
		openModal,
	} = useModalStore();

	const { mutate: createCanvasHandler } = useMutation({
		mutationFn: (values: z.infer<typeof createCanvasFormSchema>) => {
			return ExcaliApi.createCanvas({
				name: values.name,
				userId: `${data}`,
			});
		},
		onSuccess: () => {
			toast({
				description: t('components.userDashboard.toast'),
			});
			closeModal();
			resetState();
			return queryClient.invalidateQueries({ queryKey: [CANVASES_QUERY_KEY] });
		},
	});

	return (
		<TagsFilterStoreProvider>
			{/*@TODO Refactor modal system*/}
			{modalState === 'ADD_CANVAS' && (
				<CreateCanvasDialog
					isOpen={isModalOpen}
					onClose={closeModal}
					onSubmit={createCanvasHandler}
				/>
			)}

			{modalState === 'SHARE_CANVAS' && (
				<ShareCanvasDialog
					isOpen={isModalOpen}
					closeModal={closeModal}
					canvasId={modalProps?.selectedId || null}
				/>
			)}

			<Toaster />
			<ContentWrapper pagePaths={['Dashboard', 'Canvases']}>
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">
								{t('components.userDashboard.all')}
							</TabsTrigger>
							{/*<TabsTrigger value="draft">Draft</TabsTrigger>*/}
							{/*<TabsTrigger value="archived">Archived</TabsTrigger>*/}
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<DashboardFilters />
							<PrimaryActionButton
								onClickHandler={() =>
									openModal({
										modalState: 'ADD_CANVAS',
									})
								}
								icon={<PlusCircle className="h-3.5 w-3.5" />}
							>
								{t('components.userDashboard.createCanvasTitle')}
							</PrimaryActionButton>
						</div>
					</div>
					<TabsContentWrapper
						title={t('components.userDashboard.title')}
						description={t('components.userDashboard.description')}
					/>
				</Tabs>
			</ContentWrapper>
		</TagsFilterStoreProvider>
	);
}
