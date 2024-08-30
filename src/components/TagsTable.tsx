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
import { useTranslation } from 'react-i18next';

interface TagsTableProps {
	tags: CanvasTagDTO[] | undefined;
	isLoading: boolean;
}

export function TagsTable({ tags, isLoading }: TagsTableProps) {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
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
						<TableHead>{t('dashboardPage.tags.table.name')}</TableHead>
						<TableHead className="hidden md:table-cell">
							{t('dashboardPage.tags.table.color')}
						</TableHead>
						<TableHead className="hidden md:table-cell">
							{t('dashboardPage.tags.table.description')}
						</TableHead>
						<TableHead>
							{t('dashboardPage.tags.table.actions')}
							<span className="sr-only">
								{t('dashboardPage.tags.table.actions')}
							</span>
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
															<span className="sr-only">
																{' '}
																{t('components.common.toggleMenu')}
															</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>
															{t('components.common.actions')}
														</DropdownMenuLabel>
														<DropdownMenuItem
															onClick={() => {
																openModal({
																	modalState: 'EDIT_TAG',
																	params: { selectedId: value.id },
																});
															}}
														>
															{t('components.buttons.edit')}
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => {
																openModal({
																	modalState: 'REMOVE_TAG',
																	params: { selectedId: value.id },
																});
															}}
														>
															{t('components.buttons.delete')}
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
