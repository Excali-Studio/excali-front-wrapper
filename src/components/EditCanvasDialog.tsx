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

type CanvasIdValue = string | null;

interface EditCanvasDialogProps {
	canvasId: CanvasIdValue;
	onClose: () => void;
}

export default function EditCanvasDialog({
	canvasId,
	onClose,
}: EditCanvasDialogProps) {
	const { form, onSubmit, tags, selectedTagsName, onSelect } =
		useEditCanvasForm(canvasId, onClose);

	const isOpen = typeof canvasId === 'string';

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit canvas</DialogTitle>
					<DialogDescription>
						New canvas will be by default private
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
										<FormLabel>Name</FormLabel>
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
										<FormLabel>Tags</FormLabel>
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
								<Button type="submit">Save canvas</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
