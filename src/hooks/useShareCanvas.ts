import { useMutation, useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';
import { ShareCanvas } from '@/schema/share-canvas';
import { useModalStore } from '@/store/modalStore';
import { toast } from '@/components/ui/use-toast';

export const useShareCanvas = (
	canvasId: string | null,
	resetForm: () => void
) => {
	const { closeModal, resetState } = useModalStore();

	const { data: usersData = [] } = useQuery({
		queryKey: ['users'],
		queryFn: ExcaliApi.getUsers,
	});

	const { data: canvasData } = useQuery({
		queryKey: ['canvas', canvasId],
		queryFn: () => ExcaliApi.getCanvasById(`${canvasId}`),
		enabled: Boolean(canvasId),
	});

	const users = usersData.map((elem) => ({
		value: elem.id,
		label: elem.email,
	}));

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
		mutationFn: (values: ShareCanvas) => {
			return ExcaliApi.giveAccessByTag(values);
		},
		onSuccess,
		onError,
	});

	return { users, canvasData, giveAccessToCanvas };
};
