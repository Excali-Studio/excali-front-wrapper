import { useMutation } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';
import { ShareCanvasById } from '@/schema/share-canvas';
import { useModalStore } from '@/store/modalStore';
import { toast } from '@/components/ui/use-toast';

export const useShareCanvasById = (resetForm: () => void) => {
	const { closeModal, resetState } = useModalStore();

	const onSuccess = () => {
		toast({
			description: 'Successfully shared canvas',
		});
		resetForm();
		closeModal();
		resetState();
	};

	const onError = () => {
		toast({
			description: 'An error occurred while sharing canvas.',
		});
		closeModal();
		resetState();
	};

	const { mutate: giveAccessToCanvas } = useMutation({
		mutationFn: (values: ShareCanvasById) => {
			return ExcaliApi.giveAccessById(values);
		},
		onSuccess,
		onError,
	});

	return { giveAccessToCanvas };
};
