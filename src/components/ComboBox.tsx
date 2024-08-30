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

interface DataItem {
	label: string;
	value: string;
}

interface ComboBoxProps<T extends DataItem> {
	data: T[];
	selectedData: T['value'][];
	onSelect: (value: T['value']) => void;
	selectedValueLabel: string;
	placeholder: string;
}

export function ComboBox<T extends DataItem>({
	selectedValueLabel,
	data,
	selectedData,
	onSelect,
	placeholder,
}: ComboBoxProps<T>) {
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
            <span className="w-full truncate">
              {selectedData.length > 0 ? selectedValueLabel : placeholder}
            </span>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[215px] p-0">
          <Command>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="focus-visible:ring-0"
              placeholder="Find tag..."
            />
            <CommandEmpty>No tags found.</CommandEmpty>
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
                      "ml-auto h-4 w-4",
                      isIdSelected(tag.value) ? "opacity-100" : "opacity-0",
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
