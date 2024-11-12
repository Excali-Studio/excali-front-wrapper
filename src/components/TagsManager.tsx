import { Toaster } from '@/components/ui/toaster';
import ContentWrapper from '@/components/ContentWrapper';
import { TagsContent } from '@/components/TagsContent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryActionButton from '@/components/buttons/PrimaryActionButton';
import { PlusCircle, ShareIcon } from 'lucide-react';
import CreateOrModifyTagDialog from '@/components/CreateOrModifyTagDialog';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '@/lib/useUserAuth';
import { Navigate } from 'react-router-dom';
import { ShareCanvasByTagDialog } from '@/components/ShareCanvasByTagDialog';

export default function TagsManager() {
	const { t } = useTranslation();
	const { openModal, resetState, modalProps, modalState } = useModalStore();
	const { data: user } = useUserAuth();

	const isUserAdmin = user?.roles.some((role) => role.name === 'ADMIN');

	if (!isUserAdmin) return <Navigate to="/dashboard" replace />;

	return (
		<>
			<Toaster />
			{(modalState === 'ADD_TAG' || modalState === 'EDIT_TAG') && (
				<CreateOrModifyTagDialog currentTagId={modalProps?.selectedId} />
			)}

			{modalState === 'SHARE_CANVAS_BY_TAG' && <ShareCanvasByTagDialog />}

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
										modalState: 'SHARE_CANVAS_BY_TAG',
									});
								}}
								icon={<ShareIcon className="h-3.5 w-3.5" />}
							>
								{t('components.tagsManager.shareByTag')}
							</PrimaryActionButton>
							<PrimaryActionButton
								onClickHandler={() => {
									resetState();
									openModal({
										modalState: 'ADD_TAG',
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
