import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ComboBox';
import { ShareCanvasByTag } from '@/schema/share-canvas';
import { useShareCanvasByTag } from '@/hooks/useShareCanvasByTag';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@/store/modalStore';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useGetTags } from '@/hooks/useGetTags';

export const ShareCanvasByTagDialog = () => {
	const { closeModal, isModalOpen } = useModalStore();

	const { t } = useTranslation();
	const methods = useForm<ShareCanvasByTag>({
		defaultValues: {
			personIds: [],
			tagIds: [],
		},
	});

	const { giveAccessToCanvas } = useShareCanvasByTag(methods.reset);
	const { users } = useGetUsers();
	const { tags } = useGetTags();

	const onSubmit = async (data: ShareCanvasByTag) => {
		return giveAccessToCanvas(data);
	};

	function onSelect(field: 'personIds' | 'tagIds', value: string) {
		const selected = methods.getValues(field);
		if (selected.includes(value)) {
			methods.setValue(
				field,
				selected.filter((user) => user !== value)
			);
		} else {
			methods.setValue(field, [...selected, value]);
		}
	}

	const selectedUsersName = methods
		.watch('personIds')
		.map((user) => users.find((t) => t.value === user)?.label)
		.join(', ');

	const selectedTags = methods
		.watch('tagIds')
		.map((tag) => tags.find((t) => t.value === tag)?.label)
		.join(', ');

	// const selectedTags = methods
	// 	.watch('tagIds')
	// 	.map((tag) => tag.find((t) => t.value === user)?.label)
	// 	.join(', ');

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={() => {
				closeModal();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('components.shareCanvasDialog.title')}</DialogTitle>
				</DialogHeader>
				<div>
					<Form {...methods}>
						<form
							className="space-y-8"
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<FormField
								control={methods.control}
								name="tagIds"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.shareCanvasDialog.form.tags')}
										</FormLabel>
										<FormControl>
											<ComboBox
												field="tags"
												className="w-full"
												selectedData={field.value}
												selectedValueLabel={selectedTags}
												onSelect={(v) => onSelect('tagIds', v)}
												data={tags}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="personIds"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.shareCanvasDialog.form.users')}
										</FormLabel>
										<FormControl>
											<ComboBox
												field="users"
												className="w-full"
												selectedData={field.value}
												selectedValueLabel={selectedUsersName}
												onSelect={(v) => onSelect('personIds', v)}
												data={users}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">
									{t('components.shareCanvasDialog.submit')}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
