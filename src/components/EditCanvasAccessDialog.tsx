import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { canvasAccessByIdDTO, ExcaliApi } from '@/lib/api/excali-api';
import { XIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EditCanvasDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function EditCanvasAccessDialog({
	isOpen,
	onClose,
}: EditCanvasDialogProps) {
	const { t } = useTranslation();
	const { modalProps } = useModalStore();

	const queryClient = useQueryClient();

	const currentCanvasId = modalProps?.selectedId;

	const currentCanvasQueryKey = ['canvas', currentCanvasId];

	const { data: canvasData } = useQuery({
		queryKey: currentCanvasQueryKey,
		queryFn: () => ExcaliApi.getCanvasById(`${currentCanvasId}`),
		enabled: Boolean(currentCanvasId),
	});

	const { mutate: removeAccessById } = useMutation({
		mutationFn: (data: canvasAccessByIdDTO) => ExcaliApi.removeAccessById(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: currentCanvasQueryKey });
			toast({
				title: 'Access remove successfully',
			});
		},
	});

	const { resetState } = useModalStore();

	const canvasAccesses =
		canvasData?.canvasAccesses.sort((a, b) =>
			a.isOwner && b.isOwner ? 0 : a.isOwner ? -1 : 1
		) ?? [];

	function removeAccess(userId: string) {
		if (!currentCanvasId) {
			onClose();
			return toast({
				variant: 'destructive',
				title: 'Invalid canvasId',
			});
		}

		removeAccessById({
			canvasId: currentCanvasId,
			personId: userId,
		});
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				resetState();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{t('components.editCanvasAccessDialog.title')}
					</DialogTitle>
					<DialogDescription>
						{t('components.editCanvasAccessDialog.description')}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{canvasAccesses.map(({ user, isOwner }) => (
						<div key={user.id} className="flex items-center">
							{!isOwner && (
								<XIcon
									className="h-4 w-4 cursor-pointer text-red-500"
									onClick={() => removeAccess(user.id)}
								/>
							)}
							<p className={isOwner ? 'text-neutral-500' : ''}>
								{user.displayName}
							</p>
						</div>
					))}
				</div>
				<DialogFooter>
					<Button onClick={onClose}>
						{t('components.editCanvasAccessDialog.close')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
