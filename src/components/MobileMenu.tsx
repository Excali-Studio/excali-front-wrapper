import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, PanelLeft, Tags } from 'lucide-react';
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
						to="/dashboard"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Home className="h-5 w-5" />
						{t('components.mobileMenu.dashboard')}
					</Link>
					<Link
						to="/tags"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Tags className="h-5 w-5" />
						{t('components.mobileMenu.tags')}
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
