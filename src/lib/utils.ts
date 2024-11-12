import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const arrayToMap = <T extends { id: string } | string>(
	items: readonly T[] | Map<string, T>
) => {
	if (items instanceof Map) {
		return items;
	}
	return items.reduce((acc: Map<string, T>, element) => {
		acc.set(typeof element === 'string' ? element : element.id, element);
		return acc;
	}, new Map());
};
