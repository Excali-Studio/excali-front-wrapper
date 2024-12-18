import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	CreateOrModifyTagFormSchema,
	createOrModifyTagFormSchema,
} from '@/schema/create-or-modify-tag';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useCreateOrModifyTag } from '@/hooks/useCreateOrModifyTag';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';

interface CreateOrModifyCanvasDialogProps {
	currentTagId?: string | null;
}

export default function CreateOrModifyTagDialog({
	currentTagId,
}: CreateOrModifyCanvasDialogProps) {
	const { closeModal, isModalOpen, modalState } = useModalStore();
	const { t } = useTranslation();

	const form = useForm<CreateOrModifyTagFormSchema>({
		resolver: zodResolver(createOrModifyTagFormSchema),
		defaultValues: {
			name: '',
		},
	});

	const { tagDetails, createTagHandler, updateTagHandler } =
		useCreateOrModifyTag(currentTagId, form.reset);

	useEffect(() => {
		if (tagDetails) {
			form.setValue('name', tagDetails.name);
			tagDetails.color && form.setValue('color', tagDetails.color);
			tagDetails.description &&
				form.setValue('description', tagDetails.description);
		}
	}, [form, tagDetails]);

	function onSubmit(formValues: CreateOrModifyTagFormSchema) {
		const formData = {
			...formValues,
			description: formValues.description || undefined,
		};

		currentTagId ? updateTagHandler(formData) : createTagHandler(formData);
	}

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={() => {
				if (modalState === 'EDIT_TAG') {
					form.reset();
				}
				closeModal();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{(modalState === 'ADD_TAG' &&
							t('components.createOrModifyTagDialog.create.title')) ||
							(modalState === 'EDIT_TAG' &&
								t('components.createOrModifyTagDialog.edit.title'))}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.createOrModifyTagDialog.form.fields.name')}
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t(
												'components.createOrModifyTagDialog.form.fields.description'
											)}
										</FormLabel>
										<FormControl>
											<Textarea placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>
												{t(
													'components.createOrModifyTagDialog.form.fields.color'
												)}
											</FormLabel>
											<div className="flex items-center gap-2">
												<p className="font-mono">{field.value}</p>
												<FormControl>
													<Input
														type="color"
														{...field}
														className="w-[50px] cursor-pointer"
													/>
												</FormControl>
											</div>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">
									{t('components.createOrModifyTagDialog.form.saveTagButton')}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
