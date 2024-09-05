import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ComboBox } from '@/components/ComboBox';
import { useEditCanvasForm } from '@/hooks/useEditCanvasForm';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';

interface EditCanvasDialogProps {
	isOpen: boolean;
	canvasId?: string;
	onClose: () => void;
}

export default function EditCanvasDialog({
	isOpen,
	canvasId,
	onClose,
}: EditCanvasDialogProps) {
	const { t } = useTranslation();
	const { form, onSubmit, tags, selectedTagsName, onSelect } =
		useEditCanvasForm(canvasId, onClose);

	const { resetState } = useModalStore();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				form.reset();
				resetState();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('components.editCanvasDialog.title')}</DialogTitle>
					<DialogDescription>
						{t('components.editCanvasDialog.description')}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form onSubmit={onSubmit} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.editCanvasDialog.form.fields.name')}
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
								name="selectedTags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.editCanvasDialog.form.fields.tags')}
										</FormLabel>
										<FormControl>
											<ComboBox
												placeholder="Select tags..."
												selectedData={field.value}
												selectedValueLabel={selectedTagsName}
												onSelect={onSelect}
												data={tags}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">
									{t('components.editCanvasDialog.saveCanvasButton')}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
