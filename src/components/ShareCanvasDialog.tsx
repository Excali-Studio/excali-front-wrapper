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
import { ShareCanvas } from '@/schema/share-canvas';
import { useShareCanvas } from '@/hooks/useShareCanvas';
import { useTranslation } from 'react-i18next';

interface ShareCanvasDialogProps {
	isOpen: boolean;
	closeModal: () => void;
	canvasId: string | null;
}

export const ShareCanvasDialog = ({
	canvasId,
	isOpen,
	closeModal,
}: ShareCanvasDialogProps) => {
	const { t } = useTranslation();
	const methods = useForm<ShareCanvas>({
		defaultValues: {
			personIds: [],
		},
	});

	const { users, canvasData, giveAccessToCanvas } = useShareCanvas(
		canvasId,
		methods.reset
	);

	const onSubmit = async (data: ShareCanvas) => {
		const formData = {
			tagIds: canvasData?.tags.map((elem) => elem.id) || [],
			personIds: data.personIds,
		};
		return giveAccessToCanvas(formData);
	};

	function onSelect(value: string) {
		const selected = methods.getValues('personIds');
		if (selected.includes(value)) {
			methods.setValue(
				'personIds',
				selected.filter((user) => user !== value)
			);
		} else {
			methods.setValue('personIds', [...selected, value]);
		}
	}

	const selectedUsersName = methods
		.watch('personIds')
		.map((user) => users.find((t) => t.value === user)?.label)
		.join(', ');

	return (
		<Dialog
			open={isOpen}
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
												onSelect={onSelect}
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
