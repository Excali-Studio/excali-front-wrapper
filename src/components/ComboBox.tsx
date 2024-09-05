import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

interface DataItem {
	label: string;
	value: string;
}

interface ComboBoxProps<T extends DataItem> {
	field: 'tags' | 'users';
	className?: string;
	data: T[];
	selectedData: T['value'][];
	onSelect: (value: T['value']) => void;
	selectedValueLabel: string;
}

export function ComboBox<T extends DataItem>({
	field,
	className,
	selectedValueLabel,
	data,
	selectedData,
	onSelect,
}: ComboBoxProps<T>) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const filteredData = useMemo(() => {
		return (
			data?.filter((element) => {
				return element.label.toLowerCase().includes(search.toLowerCase());
			}) ?? []
		);
	}, [data, search]);

	function isIdSelected(id: T['value']) {
		return selectedData.some((selectedId) => selectedId === id);
	}

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between text-left"
					>
						<span className="max-w-[400px] truncate">
							{selectedData.length > 0
								? selectedValueLabel
								: t(`components.comboBox.inputPlaceholder`, {
										field: t(`components.comboBox.fields.${field}`),
									})}
						</span>
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={clsx('w-[215px] p-0', className)}>
					<Command>
						<Input
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							className="focus-visible:ring-0"
							placeholder={`${t('components.comboBox.placeholder', {
								field: t(`components.comboBox.fields.${field}`),
							})}`}
						/>
						<CommandEmpty>
							{t(`components.comboBox.noData`, {
								field: t(`components.comboBox.fields.${field}`),
							})}
						</CommandEmpty>
						<CommandGroup>
							{filteredData.map((tag) => (
								<CommandItem
									key={tag.value}
									value={tag.value}
									onSelect={onSelect}
									className="uppercase"
								>
									{tag.label.toLowerCase()}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											isIdSelected(tag.value) ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}
