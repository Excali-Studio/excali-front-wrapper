import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';

interface DeleteTagDialogProps {
	isModalOpen: boolean;
	closeModal: () => void;
	onSubmit: () => void;
}

export function DeleteTagDialog({
	onSubmit,
	isModalOpen,
	closeModal,
}: DeleteTagDialogProps) {
	const { resetState } = useModalStore();
	const { t } = useTranslation();

	return (
		<Dialog onOpenChange={closeModal} open={isModalOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('deleteTagDialog.title')}</DialogTitle>
				</DialogHeader>
				<DialogFooter className="flex justify-between">
					<Button
						onClick={() => {
							closeModal();
							resetState();
						}}
						variant="ghost"
					>
						{t('deleteTagDialog.cancelButton')}
					</Button>
					<Button
						onClick={() => {
							onSubmit();
							resetState();
						}}
					>
						{t('deleteTagDialog.deleteButton')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
