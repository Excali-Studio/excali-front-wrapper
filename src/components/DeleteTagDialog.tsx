import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modalStore';

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

	return (
		<Dialog onOpenChange={closeModal} open={isModalOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure you want delete this tag?</DialogTitle>
				</DialogHeader>
				<DialogFooter className="flex justify-between">
					<Button
						onClick={() => {
							closeModal();
							resetState();
						}}
						variant="ghost"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							onSubmit();
							resetState();
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
