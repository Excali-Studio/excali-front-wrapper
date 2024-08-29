import { PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
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

//TODO Add modal store in this section - No jira task yet.
export default function UserDashboard() {
	const [isCreateCanvasOpen, setIsCreateCanvasOpen] = useState(false);
	const { data } = useUserAuth();
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate: createCanvasHandler } = useMutation({
		mutationFn: (values: z.infer<typeof createCanvasFormSchema>) => {
			return ExcaliApi.createCanvas({
				name: values.name,
				userId: `${data}`,
			});
		},
		onSuccess: () => {
			toast({
				description: 'Your canvas has been saved.',
			});
			setIsCreateCanvasOpen(false);
			return queryClient.invalidateQueries({ queryKey: [CANVASES_QUERY_KEY] });
		},
	});

	return (
		<TagsFilterStoreProvider>
			<CreateCanvasDialog
				isOpen={isCreateCanvasOpen}
				setIsOpen={setIsCreateCanvasOpen}
				onSubmit={createCanvasHandler}
			/>
			<Toaster />
			<ContentWrapper pagePaths={['Dashboard', 'Canvases']}>
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							{/*<TabsTrigger value="draft">Draft</TabsTrigger>*/}
							{/*<TabsTrigger value="archived">Archived</TabsTrigger>*/}
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<DashboardFilters />
							<PrimaryActionButton
								onClickHandler={() => setIsCreateCanvasOpen(true)}
								icon={<PlusCircle className="h-3.5 w-3.5" />}
							>
								Create new canvas
							</PrimaryActionButton>
						</div>
					</div>
					<TabsContentWrapper
						title={'Canvases'}
						description={'Your projects list (private & shared)'}
					/>
				</Tabs>
			</ContentWrapper>
		</TagsFilterStoreProvider>
	);
}
