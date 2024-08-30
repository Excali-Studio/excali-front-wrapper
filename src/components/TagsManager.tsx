import { Toaster } from "@/components/ui/toaster.tsx";
import ContentWrapper from "@/components/ContentWrapper.tsx";
import { TagsContent } from "@/components/TagsContent.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import PrimaryActionButton from "@/components/buttons/PrimaryActionButton.tsx";
import { PlusCircle } from "lucide-react";
import CreateOrModifyTagDialog from "@/components/CreateOrModifyTagDialog.tsx";
import {useModalStore} from '@/store/modalStore.ts';

export default function TagsManager() {
  const { openModal, modalState, resetState, modalProps } = useModalStore();

  return (
    <>
      <Toaster />
        {(modalState === 'ADD_TAG' || modalState === 'EDIT_TAG') && (
            <CreateOrModifyTagDialog
                currentTagId={modalProps?.selectedId ?? null}
            />
        )}

      <ContentWrapper pagePaths={["Dashboard", "Tags Manager"]}>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <PrimaryActionButton
                onClickHandler={() => {
                  resetState();
                  openModal({modalState: 'ADD_TAG', params: {selectedId: null}});
                }}
                icon={<PlusCircle className="h-3.5 w-3.5" />}
              >
                Create new tag
              </PrimaryActionButton>
            </div>
          </div>
          <TagsContent />
        </Tabs>
      </ContentWrapper>
    </>
  );
}
