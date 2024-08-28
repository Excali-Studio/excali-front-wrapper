import { createStore } from 'zustand/vanilla';
import { CanvasTagDTO } from '@/lib/api/excali-api.ts';

export type CanvasTagId = CanvasTagDTO['id'];

export interface TagsFilterState {
	selectedTags: CanvasTagId[];
}

export interface TagsFilterActions {
	setSelectedTags: (tags: CanvasTagId[]) => void;
	onSelect: (tagId: string) => void;
	unselectAll: () => void;
}

export interface TagsFilterGetters {
	getSelectedTagsName: (tags: CanvasTagDTO[]) => string;
	isIdSelected: (tagId: string) => boolean;
}

export interface TagsFilterStore
	extends TagsFilterState,
		TagsFilterActions,
		TagsFilterGetters {}

export const createFilterTagsStore = () => {
	return createStore<TagsFilterStore>()((set, get) => ({
		selectedTags: [],

		setSelectedTags: (selectedTags) => set({ selectedTags }),

		onSelect: (tagId: string) => {
			const { selectedTags } = get();

			const isTagSelected = selectedTags.some(
				(selectedTagId) => selectedTagId === tagId
			);

			if (isTagSelected) {
				set({
					selectedTags: selectedTags.filter(
						(selectedTagId) => selectedTagId !== tagId
					),
				});
			} else {
				set({ selectedTags: [...selectedTags, tagId] });
			}
		},

		getSelectedTagsName: (tags) => {
			const selectedTags = tags.filter((tag) =>
				get().selectedTags.includes(tag.id)
			);
			return selectedTags
				.map((tag) => {
					const [firstLetter, ...rest] = tag.name.toLowerCase();
					return `${firstLetter.toUpperCase()}${rest.join('')}`;
				})
				.join(', ');
		},

		isIdSelected: (tagId: string) => {
			const { selectedTags } = get();
			return selectedTags.some((selectedTagId) => selectedTagId === tagId);
		},

		unselectAll: () => set({ selectedTags: [] }),
	}));
};
