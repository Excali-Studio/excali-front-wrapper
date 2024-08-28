import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog.tsx';
import { createCanvasFormSchema } from '@/schema/createcanvas.ts';

interface CreateCanvasDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (data: z.infer<typeof createCanvasFormSchema>) => void;
}

export default function CreateCanvasDialog({
	isOpen,
	setIsOpen,
	onSubmit,
}: CreateCanvasDialogProps) {
	const form = useForm<z.infer<typeof createCanvasFormSchema>>({
		resolver: zodResolver(createCanvasFormSchema),
		defaultValues: {
			name: '',
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new canvas</DialogTitle>
					<DialogDescription>
						New canvas will be by default private
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
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>{' '}
							<DialogFooter>
								<Button type="submit">Save canvas</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
