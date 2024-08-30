import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const TAGS_TABLE_SKELETON_ROWS = 5;

export function TagsTableSkeletonLoading() {
	return Array.from({ length: TAGS_TABLE_SKELETON_ROWS }).map((_, idx) => (
		<TableRow className={'h-[73px] cursor-pointer'} key={idx}>
			<TableCell className="hidden sm:table-cell">
				<Skeleton className="h-[20px] w-[100px] rounded-sm" />
			</TableCell>
			<TableCell className="font-medium">
				<Skeleton className="h-[20px] w-[75px] rounded-sm" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-[20px] w-[150px] rounded-sm" />
			</TableCell>
			<TableCell>
				<div className="flex w-[40px] justify-center">
					<Skeleton className="h-[10px] w-[20px] rounded-sm" />
				</div>
			</TableCell>
		</TableRow>
	));
}
