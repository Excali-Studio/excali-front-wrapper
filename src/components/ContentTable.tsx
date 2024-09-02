import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApiPageData, CanvasDTO } from '@/lib/api/excali-api';
import { Badge } from '@/components/ui/badge';
import { getContrastText } from '@/lib/contrast-text';
import { CanvasTableSkeletonLoading } from '@/components/CanvasTableSkeletonLoading';
import { useTranslation } from 'react-i18next';

interface ContentTableProps {
	canvasData?: ApiPageData<CanvasDTO>;
	isLoading: boolean;
	setEditCanvasId: (value: string | null) => void;
}

export default function ContentTable({
	canvasData,
	setEditCanvasId,
	isLoading,
}: ContentTableProps) {
	const { t } = useTranslation();
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">{t('contentTable.image')}</span>
					</TableHead>
					<TableHead>{t('contentTable.name')}</TableHead>
					<TableHead className="hidden md:table-cell">
						{t('contentTable.createdAt')}
					</TableHead>
					<TableHead className="hidden md:table-cell">
						{t('contentTable.updatedAt')}
					</TableHead>
					<TableHead className="hidden lg:table-cell">
						{t('contentTable.tags')}
					</TableHead>

					<TableHead>
						{t('contentTable.actions')}
						<span className="sr-only">{t('contentTable.actions')}</span>
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
									<TableRow className={'cursor-pointer'}>
										<TableCell className="hidden sm:table-cell">
											<img
												src={'/placeholder.svg'}
												alt={'Project icon'}
												className={'rounded-xl'}
											/>
										</TableCell>
										<TableCell className="font-medium">{value.name}</TableCell>
										<TableCell className="hidden md:table-cell">
											{new Date(value.dateCreated).toLocaleString()}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{new Date(value.dateUpdated).toLocaleString()}
										</TableCell>
										<TableCell className="hidden lg:table-cell">
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
														{t('contentTable.createdAt')}
													</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={() => setEditCanvasId(value.id)}
													>
														{t('contentTable.buttons.edit')}
													</DropdownMenuItem>
													<DropdownMenuItem disabled={true}>
														{t('contentTable.buttons.share')}
													</DropdownMenuItem>
													<DropdownMenuItem disabled={true}>
														{t('contentTable.buttons.delete')}
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<Link to={`/editor/${value.id}`}>
												<Button>{t('contentTable.buttons.load')}</Button>
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
