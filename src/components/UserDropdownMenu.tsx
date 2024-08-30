import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/lib/useUserAuth';
import { useTranslation } from 'react-i18next';

export default function UserDropdownMenu() {
	const { mutate: logoutHandler } = useLogout();
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					<img src={'/placeholder-user.jpg'} alt={'Avatar'} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className={'disabled'}>
					{t('dashboardPage.user.myAccount')}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem style={{ cursor: 'pointer' }}>
					{t('dashboardPage.user.settings')}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => logoutHandler()}
					style={{ cursor: 'pointer' }}
				>
					{t('dashboardPage.user.logout')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
