import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';

interface BreadcrumbsProps {
	pagePaths: string[];
}

export default function Breadcrumbs({ pagePaths }: BreadcrumbsProps) {
	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				{pagePaths &&
					pagePaths.map((page, idx) => {
						return (
							<div style={{ display: 'contents' }} key={idx}>
								{idx > 0 && <BreadcrumbSeparator />}
								<BreadcrumbItem>
									<BreadcrumbPage>{page}</BreadcrumbPage>
								</BreadcrumbItem>
							</div>
						);
					})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
