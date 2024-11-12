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
import { ShareCanvasById } from '@/schema/share-canvas';
import { useTranslation } from 'react-i18next';
import { useShareCanvasById } from '@/hooks/useShareCanvasById';
import { useGetUsers } from '@/hooks/useGetUsers';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface ShareCanvasDialogProps {
	isOpen: boolean;
	closeModal: () => void;
	canvasId?: string;
}

export const ShareCanvasByIdDialog = ({
	canvasId,
	isOpen,
	closeModal,
}: ShareCanvasDialogProps) => {
	const { t } = useTranslation();
	const methods = useForm<ShareCanvasById>({
		defaultValues: {
			canvasId,
		},
	});

	const { users } = useGetUsers();

	const { giveAccessToCanvas } = useShareCanvasById(methods.reset);

	const onSubmit = async (data: ShareCanvasById) => {
		return giveAccessToCanvas(data);
	};

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
								name="personId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('components.shareCanvasDialog.form.users')}
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={(v) => methods.setValue('personId', v)}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select..." />
												</SelectTrigger>
												<SelectContent>
													{users.map((user) => (
														<SelectItem key={user.value} value={user.value}>
															{user.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
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
