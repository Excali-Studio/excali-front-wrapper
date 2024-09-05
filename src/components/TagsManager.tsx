import { Toaster } from '@/components/ui/toaster';
import ContentWrapper from '@/components/ContentWrapper';
import { TagsContent } from '@/components/TagsContent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryActionButton from '@/components/buttons/PrimaryActionButton';
import { PlusCircle } from 'lucide-react';
import CreateOrModifyTagDialog from '@/components/CreateOrModifyTagDialog';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';

export default function TagsManager() {
	const { t } = useTranslation();
	const { openModal, modalState, resetState, modalProps } = useModalStore();

	return (
		<>
			<Toaster />
			{(modalState === 'ADD_TAG' || modalState === 'EDIT_TAG') && (
				<CreateOrModifyTagDialog
					currentTagId={modalProps?.selectedId ?? null}
				/>
			)}

			<ContentWrapper pagePaths={['Dashboard', 'Tags Manager']}>
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">
								{t('components.tagsManager.all')}
							</TabsTrigger>
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<PrimaryActionButton
								onClickHandler={() => {
									resetState();
									openModal({
										modalState: 'ADD_TAG',
										params: { selectedId: null },
									});
								}}
								icon={<PlusCircle className="h-3.5 w-3.5" />}
							>
								{t('components.tagsManager.createButton')}
							</PrimaryActionButton>
						</div>
					</div>
					<TagsContent />
				</Tabs>
			</ContentWrapper>
		</>
	);
}
