import { ReactNode } from 'react';
import DesktopSidebar from '@/components/DesktopSidebar.tsx';
import MobileMenu from '@/components/MobileMenu.tsx';
import Breadcrumbs from '@/components/Breadcrumbs.tsx';
import SearchInput from '@/components/SearchInput.tsx';
import UserDropdownMenu from '@/components/UserDropdownMenu.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

interface ContentWrapperProps {
	children: ReactNode;
	pagePaths: string[];
}

export default function ContentWrapper({
	children,
	pagePaths,
}: ContentWrapperProps) {
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-muted">
				<DesktopSidebar />
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
						<MobileMenu />
						<Breadcrumbs pagePaths={pagePaths} />
						<SearchInput />
						<UserDropdownMenu />
					</header>
					<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
						{children}
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
