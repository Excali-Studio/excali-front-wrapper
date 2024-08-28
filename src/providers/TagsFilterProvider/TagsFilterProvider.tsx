import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import {
	type TagsFilterStore,
	createFilterTagsStore,
} from './tags-filter-store.ts';

export const TagsFilterStoreContext =
	createContext<StoreApi<TagsFilterStore> | null>(null);

export interface TagsFilterStoreProviderProps {
	children: ReactNode;
}

export const TagsFilterStoreProvider = ({
	children,
}: TagsFilterStoreProviderProps) => {
	const storeRef = useRef<StoreApi<TagsFilterStore>>();
	if (!storeRef.current) {
		storeRef.current = createFilterTagsStore();
	}

	return (
		<TagsFilterStoreContext.Provider value={storeRef.current}>
			{children}
		</TagsFilterStoreContext.Provider>
	);
};

export const useTagsFilterStore = <T,>(
	selector: (store: TagsFilterStore) => T
): T => {
	const tagsFilterStoreContext = useContext(TagsFilterStoreContext);

	if (!tagsFilterStoreContext) {
		throw new Error(`invalid context usage: useTagsFilterStore`);
	}

	return useStore(tagsFilterStoreContext, selector);
};
