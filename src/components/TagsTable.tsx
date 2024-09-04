import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getContrastText } from '@/lib/contrast-text';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { CanvasTagDTO, ExcaliApi } from '@/lib/api/excali-api';
import { TagsTableSkeletonLoading } from '@/components/TagsTableSkeletonLoading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteTagDialog } from '@/components/DeleteTagDialog';
import { useModalStore } from '@/store/modalStore';
import CreateOrModifyTagDialog from '@/components/CreateOrModifyTagDialog';

interface TagsTableProps {
	tags: CanvasTagDTO[] | undefined;
	isLoading: boolean;
}

export function TagsTable({ tags, isLoading }: TagsTableProps) {
	const queryClient = useQueryClient();
	const { isModalOpen, openModal, closeModal, modalState, modalProps } =
		useModalStore();

	const { mutate: deleteTagHandler } = useMutation({
		mutationFn: (tagId: string) => ExcaliApi.deleteTag(tagId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['canvas-tags'] }),
	});

	return (
		<>
			{modalState === 'REMOVE_TAG' && (
				<DeleteTagDialog
					isModalOpen={isModalOpen}
					closeModal={closeModal}
					onSubmit={() => {
						deleteTagHandler(`${modalProps?.selectedId}`);
						closeModal();
					}}
				/>
			)}

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead className="hidden md:table-cell">Color</TableHead>
						<TableHead className="hidden md:table-cell">Description</TableHead>
						<TableHead>
							Actions
							<span className="sr-only">Actions</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tags && !isLoading ? (
						<>
							{tags.map((value, idx) => {
								return (
									<React.Fragment key={idx}>
										<TableRow className={'cursor-pointer'}>
											<TableCell className="font-medium">
												{value.name}
											</TableCell>
											<TableCell className="hidden md:table-cell">
												<Badge
													variant="outline"
													style={{
														background: value.color ?? 'unset',
														color: value.color
															? getContrastText(value.color)
															: 'unset',
													}}
												>
													{value.color || 'No color'}
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												{value.description}
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															aria-haspopup="true"
															size="icon"
															variant="ghost"
														>
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">Toggle menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>
															<CreateOrModifyTagDialog
																onClick={() => {
																	openModal({
																		modalState: 'EDIT_TAG',
																		params: { selectedId: value.id },
																	});
																}}
															>
																Edit
															</CreateOrModifyTagDialog>
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => {
																openModal({
																	modalState: 'REMOVE_TAG',
																	params: { selectedId: value.id },
																});
															}}
														>
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									</React.Fragment>
								);
							})}
						</>
					) : (
						<TagsTableSkeletonLoading />
					)}
				</TableBody>
			</Table>
		</>
	);
}
