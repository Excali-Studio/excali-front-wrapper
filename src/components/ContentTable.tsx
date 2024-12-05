import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { useCallback } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiPageData, CanvasDTO, ExcaliApi } from '@/lib/api/excali-api';
import { Badge } from '@/components/ui/badge';
import { getContrastText } from '@/lib/contrast-text';
import { CanvasTableSkeletonLoading } from '@/components/CanvasTableSkeletonLoading';
import { useModalStore } from '@/store/modalStore';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { CANVASES_QUERY_KEY } from '@/components/TabsContent';

interface ContentTableProps {
	canvasData?: ApiPageData<CanvasDTO>;
	isLoading: boolean;
}

export default function ContentTable({
	canvasData,
	isLoading,
}: ContentTableProps) {
	const { openModal } = useModalStore();
	const { t } = useTranslation();

	const queryClient = useQueryClient();

	const { mutate: deleteCanvas } = useMutation({
		mutationFn: ExcaliApi.deleteCanvasById,
		onSuccess: () => {
			toast({
				title: 'Canvas deleted successfully',
			});
			return queryClient.invalidateQueries({ queryKey: [CANVASES_QUERY_KEY] });
		},
	});

	const navigate = useNavigate();

	const redirectToCanvas = useCallback(
		(canvasId: string) => {
			navigate(`/editor/${canvasId}`);
		},
		[navigate]
	);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{/*@TODO: Canvas preview implementation*/}
					{/*<TableHead className="hidden w-[100px] sm:table-cell">*/}
					{/*	<span className="sr-only">*/}
					{/*		{t('components.contentTable.image')}*/}
					{/*	</span>*/}
					{/*</TableHead>*/}
					<TableHead>{t('components.contentTable.name')}</TableHead>
					<TableHead className="hidden md:table-cell">
						{t('components.contentTable.owner')}
					</TableHead>
					<TableHead className="hidden md:table-cell">
						{t('components.contentTable.createdAt')}
					</TableHead>
					<TableHead className="hidden md:table-cell">
						{t('components.contentTable.updatedAt')}
					</TableHead>
					<TableHead className="hidden lg:table-cell">
						{t('components.contentTable.tags')}
					</TableHead>

					<TableHead>
						{t('components.contentTable.actions')}
						<span className="sr-only">
							{t('components.contentTable.actions')}
						</span>
					</TableHead>
					<TableHead className="hidden md:table-cell"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{canvasData && !isLoading ? (
					<>
						{canvasData.data.map((value, idx) => {
							return (
								<React.Fragment key={idx}>
									<TableRow className="cursor-pointer p-8">
										{/*@TODO: Canvas preview implementation*/}
										{/*<TableCell*/}
										{/*	className="hidden sm:table-cell"*/}
										{/*	onClick={() => redirectToCanvas(value.id)}*/}
										{/*>*/}
										{/*	<img*/}
										{/*		src={'/placeholder.svg'}*/}
										{/*		alt={'Project icon'}*/}
										{/*		className={'rounded-xl'}*/}
										{/*	/>*/}
										{/*</TableCell>*/}
										<TableCell
											className="font-medium"
											onClick={() => redirectToCanvas(value.id)}
										>
											{value.name}
										</TableCell>
										<TableCell
											className="hidden md:table-cell"
											onClick={() => redirectToCanvas(value.id)}
										>
											{value.owner}
										</TableCell>
										<TableCell
											className="hidden md:table-cell"
											onClick={() => redirectToCanvas(value.id)}
										>
											{new Date(value.dateCreated).toLocaleString()}
										</TableCell>
										<TableCell
											className="hidden md:table-cell"
											onClick={() => redirectToCanvas(value.id)}
										>
											{new Date(value.dateUpdated).toLocaleString()}
										</TableCell>
										<TableCell
											className="hidden lg:table-cell"
											onClick={() => redirectToCanvas(value.id)}
										>
											<div className="flex gap-1">
												{value.tags.map((tag) => (
													<Badge
														key={tag.id}
														variant="outline"
														style={{
															background: tag.color ?? 'unset',
															color: tag.color
																? getContrastText(tag.color)
																: 'unset',
														}}
													>
														{tag.name}
													</Badge>
												))}
											</div>
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
													<DropdownMenuLabel>
														{t('components.contentTable.actions')}
													</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={() => {
															openModal({
																modalState: 'EDIT_CANVAS',
																params: { selectedId: value.id },
															});
														}}
													>
														{t('components.contentTable.buttons.edit')}
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															openModal({
																modalState: 'SHARE_CANVAS_BY_ID',
																params: { selectedId: value.id },
															});
														}}
													>
														{t('components.contentTable.buttons.share')}
													</DropdownMenuItem>
													{value.isOwner && (
														<DropdownMenuItem
															onClick={() => deleteCanvas(value.id)}
														>
															{t('components.contentTable.buttons.delete')}
														</DropdownMenuItem>
													)}
													{value.isOwner && (
														<DropdownMenuItem
															onClick={() => {
																openModal({
																	modalState: 'EDIT_CANVAS_ACCESS',
																	params: { selectedId: value.id },
																});
															}}
														>
															{t('components.contentTable.buttons.access')}
														</DropdownMenuItem>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<Link to={`/editor/${value.id}`}>
												<Button>
													{t('components.contentTable.buttons.load')}
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								</React.Fragment>
							);
						})}
					</>
				) : (
					<CanvasTableSkeletonLoading />
				)}
			</TableBody>
		</Table>
	);
}
