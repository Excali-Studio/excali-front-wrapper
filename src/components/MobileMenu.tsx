import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, ListChecksIcon, PanelLeft, Tags, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MobileMenu() {
	const { t } = useTranslation();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">
						{t('components.mobileMenu.toggleMenu')}
					</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						to="#"
						className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
					>
						<ListChecksIcon className="h-5 w-5 transition-all group-hover:scale-110" />
					</Link>
					<Link
						to="#"
						className="flex items-center gap-4 bg-accent px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Home className="h-5 w-5" />
						{t('components.mobileMenu.dashboard')}
					</Link>
					<Link
						to="#"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Tags className="h-5 w-5" />
						{t('components.mobileMenu.tags')}
					</Link>
					<Link
						to="#"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Users2 className="h-5 w-5" />
						{t('components.mobileMenu.users')}
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
