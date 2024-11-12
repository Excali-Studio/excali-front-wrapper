import { useQuery } from '@tanstack/react-query';
import { ExcaliApi } from '@/lib/api/excali-api';

export function useGetUsers() {
	const { data: usersData = [] } = useQuery({
		queryKey: ['users'],
		queryFn: ExcaliApi.getUsers,
	});

	return {
		users: usersData.map((elem) => ({
			value: elem.id,
			label: elem.email,
		})),
	};
}
