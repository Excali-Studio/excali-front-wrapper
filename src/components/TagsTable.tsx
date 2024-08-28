import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table.tsx';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import { getContrastText } from '@/lib/contrast-text.ts';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { MoreHorizontal } from 'lucide-react';
import { CanvasTagDTO, ExcaliApi } from '@/lib/api/excali-api.ts';
import { TagsTableSkeletonLoading } from '@/components/TagsTableSkeletonLoading.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteTagDialog } from '@/components/DeleteTagDialog.tsx';

interface TagsTableProps {
	tags: CanvasTagDTO[] | undefined;
	isLoading: boolean;
	setCurrentTagId: (tagId: string | null) => void;
}

export function TagsTable({
	tags,
	isLoading,
	setCurrentTagId,
}: TagsTableProps) {
	const queryClient = useQueryClient();
	const [deleteTagId, setDeleteTagId] = useState<string | null>(null);

	const { mutate: deleteTagHandler } = useMutation({
		mutationFn: (tagId: string) => ExcaliApi.deleteTag(tagId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['canvas-tags'] }),
	});

	return (
		<>
			<DeleteTagDialog
				deleteTagId={deleteTagId}
				closeDialog={() => setDeleteTagId(null)}
				onSubmit={() => {
					deleteTagHandler(`${deleteTagId}`);
					setDeleteTagId(null);
				}}
			/>
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
														<DropdownMenuItem
															onClick={() => setCurrentTagId(value.id)}
														>
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => setDeleteTagId(value.id)}
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
