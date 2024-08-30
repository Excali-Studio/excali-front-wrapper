import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { createCanvasFormSchema } from '@/schema/createcanvas';
import { useTranslation } from 'react-i18next';

interface CreateCanvasDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: z.infer<typeof createCanvasFormSchema>) => void;
}

export default function CreateCanvasDialog({
	isOpen,
	onClose,
	onSubmit,
}: CreateCanvasDialogProps) {
	const { t } = useTranslation();
	const form = useForm<z.infer<typeof createCanvasFormSchema>>({
		resolver: zodResolver(createCanvasFormSchema),
		defaultValues: {
			name: '',
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				form.reset();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{' '}
						{t('dashboardPage.canvases.modal.create.title')}
					</DialogTitle>
					<DialogDescription>
						{t('dashboardPage.canvases.modal.create.description')}
					</DialogDescription>
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
											{t('dashboardPage.canvases.modal.form.fields.name')}
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">
									{t('dashboardPage.canvases.modal.saveCanvasButton')}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
