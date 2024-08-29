import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteTagDialogProps {
	deleteTagId: string | null;
	closeDialog: () => void;
	onSubmit: () => void;
}

export function DeleteTagDialog({
	closeDialog,
	deleteTagId,
	onSubmit,
}: DeleteTagDialogProps) {
	return (
		<Dialog open={deleteTagId !== null}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure you want delete this tag?</DialogTitle>
				</DialogHeader>
				<DialogFooter className="flex justify-between">
					<Button onClick={closeDialog} variant="ghost">
						Cancel
					</Button>
					<Button onClick={onSubmit}>Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
