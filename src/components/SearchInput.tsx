import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

export default function SearchInput() {
	const { t } = useTranslation();
	return (
		<div className="relative ml-auto flex-1 md:grow-0">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				disabled={true}
				type="search"
				placeholder={t('components.searchInput.placeholder')}
				className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
			/>
		</div>
	);
}
