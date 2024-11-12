import { useMutation } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';
import { ShareCanvasByTag } from '@/schema/share-canvas';
import { useModalStore } from '@/store/modalStore';
import { toast } from '@/components/ui/use-toast';

export const useShareCanvasByTag = (resetForm: () => void) => {
	const { closeModal, resetState } = useModalStore();

	//TODO add translation when dictionary merged
	const onSuccess = () => {
		toast({
			description: 'Successfully shared canvas',
		});
		resetForm();
		closeModal();
		resetState();
	};

	//TODO add translation when dictionary merged
	const onError = () => {
		toast({
			description: 'An error occurred while sharing canvas.',
		});
		closeModal();
		resetState();
	};

	const { mutate: giveAccessToCanvas } = useMutation({
		mutationFn: (values: ShareCanvasByTag) => {
			return ExcaliApi.giveAccessByTag(values);
		},
		onSuccess,
		onError,
	});

	return { giveAccessToCanvas };
};
