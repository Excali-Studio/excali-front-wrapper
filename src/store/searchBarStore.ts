import { create } from 'zustand';

export type SearchBarState = {
	searchQuery: string;
};

export type SearchBarActions = {
	setSearchQuery: (query: string) => void;
};

export type SearchBarStore = SearchBarState & SearchBarActions;

export const useSearchBarStore = create<SearchBarStore>((set, get) => ({
	searchQuery: '',
	setSearchQuery: (query) => set({ ...get(), searchQuery: query }),
}));

export const useSearchBar = () => {
	return useSearchBarStore((s) => [s.searchQuery, s.setSearchQuery] as const);
};
