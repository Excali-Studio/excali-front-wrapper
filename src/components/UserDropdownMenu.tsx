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

export default function UserDropdownMenu() {
	const { mutate: logoutHandler } = useLogout();

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
				<DropdownMenuLabel className={'disabled'}>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem style={{ cursor: 'pointer' }}>
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => logoutHandler()}
					style={{ cursor: 'pointer' }}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
