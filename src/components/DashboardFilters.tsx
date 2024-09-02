import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { SelectTags } from '@/components/SelectTags';
import { XIcon } from 'lucide-react';
import { useTagsFilterStore } from '@/providers/TagsFilterProvider/TagsFilterProvider';
import { useTranslation } from 'react-i18next';

export default function DashboardFilters() {
	const unselectAll = useTagsFilterStore((s) => s.unselectAll);
	const { t } = useTranslation();

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 gap-1">
						<ListFilter className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							{t('dashboardFilters.name')}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-[250px]">
					<div className="flex cursor-pointer items-center justify-between">
						<p className="font-medium">{t('dashboardFilters.fields.select')}</p>
						<XIcon className="stroke-ring" onClick={unselectAll} size={16} />
					</div>
					<SelectTags />
				</PopoverContent>
			</Popover>
		</div>
	);
}
