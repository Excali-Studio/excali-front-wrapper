import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PrimaryActionButtonProps {
	onClickHandler?: () => void;
	icon: ReactNode;
	children: ReactNode;
}

export default function PrimaryActionButton({
	onClickHandler,
	icon,
	children,
}: PrimaryActionButtonProps) {
	return (
		<Button size="sm" className="h-8 gap-1" onClick={onClickHandler}>
			{icon}
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				{children}
			</span>
		</Button>
	);
}
