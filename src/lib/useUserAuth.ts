import { ExcaliApi } from './api/excali-api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const USER_AUTH_KEY = ['user', 'me'];

export const useUserAuth = () => {
	return useQuery({
		queryKey: USER_AUTH_KEY,
		queryFn: ExcaliApi.getMe,
		retry: false,
	});
};

export const useIsAdmin = () => {
	const { data, isLoading } = useUserAuth();
	return {
		isAdmin:
			!isLoading && data?.roles.map((role) => role.name).includes('ADMIN'),
	};
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ExcaliApi.logOutUser,
		onSuccess: () => {
			return queryClient.resetQueries({
				queryKey: USER_AUTH_KEY,
			});
		},
	});
};
