import { Toaster } from '@/components/ui/toaster';
import ContentWrapper from '@/components/ContentWrapper';
import { TagsContent } from '@/components/TagsContent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryActionButton from '@/components/buttons/PrimaryActionButton';
import { PlusCircle } from 'lucide-react';
import CreateOrModifyTagDialog from '@/components/CreateOrModifyTagDialog';
import { useModalStore } from '@/store/modalStore';
import { DialogTrigger } from '@/components/ui/dialog';

export default function TagsManager() {
	const { openModal } = useModalStore();

	return (
		<>
			<Toaster />
			<ContentWrapper pagePaths={['Dashboard', 'Tags Manager']}>
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<CreateOrModifyTagDialog
								button={
									<DialogTrigger
										onClick={(e) => {
											e.stopPropagation();
											openModal({
												modalState: 'ADD_TAG',
											});
										}}
									>
										<PrimaryActionButton
											icon={<PlusCircle className="h-3.5 w-3.5" />}
										>
											Create new tag
										</PrimaryActionButton>
									</DialogTrigger>
								}
							/>
						</div>
					</div>
					<TagsContent />
				</Tabs>
			</ContentWrapper>
		</>
	);
}
