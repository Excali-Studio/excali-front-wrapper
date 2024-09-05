import { Toaster } from '@/components/ui/toaster';
import ContentWrapper from '@/components/ContentWrapper';
import { TagsContent } from '@/components/TagsContent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryActionButton from '@/components/buttons/PrimaryActionButton';
import { PlusCircle } from 'lucide-react';
import CreateOrModifyTagDialog from '@/components/CreateOrModifyTagDialog';
import { useModalStore } from '@/store/modalStore';

export default function TagsManager() {
	const { openModal, resetState, modalProps } = useModalStore();

	return (
		<>
			<Toaster />
			<CreateOrModifyTagDialog currentTagId={modalProps?.selectedId} />
			<ContentWrapper pagePaths={['Dashboard', 'Tags Manager']}>
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<PrimaryActionButton
								onClickHandler={() => {
									resetState();
									openModal({
										modalState: 'ADD_TAG',
									});
								}}
								icon={<PlusCircle className="h-3.5 w-3.5" />}
							>
								Create new tag
							</PrimaryActionButton>
						</div>
					</div>
					<TagsContent />
				</Tabs>
			</ContentWrapper>
		</>
	);
}
