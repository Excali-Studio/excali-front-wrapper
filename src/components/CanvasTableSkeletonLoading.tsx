import { TableCell, TableRow } from '@/components/ui/table.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const CANVAS_TABLE_SKELETON_ROWS = 5;

export function CanvasTableSkeletonLoading() {
	return Array.from({ length: CANVAS_TABLE_SKELETON_ROWS }).map((_, idx) => (
		<TableRow className={'h-[100px] cursor-pointer'} key={idx}>
			<TableCell className="hidden sm:table-cell">
				<Skeleton className="h-[68px] w-[68px] rounded-xl" />
			</TableCell>
			<TableCell className="font-medium">
				<Skeleton className="h-[20px] w-[100px] rounded-sm" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-[20px] w-[100px] rounded-sm" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-[20px] w-[100px] rounded-sm" />
			</TableCell>
			<TableCell className="hidden lg:table-cell">
				<div className="flex gap-2">
					<Skeleton className="h-[20px] w-[50px] rounded-sm" />
					<Skeleton className="h-[20px] w-[50px] rounded-sm" />
					<Skeleton className="h-[20px] w-[50px] rounded-sm" />
				</div>
			</TableCell>
			<TableCell>
				<div className="flex w-[40px] justify-center">
					<Skeleton className="h-[10px] w-[20px] rounded-sm" />
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-[40px] w-[60px] rounded-sm" />
			</TableCell>
		</TableRow>
	));
}
