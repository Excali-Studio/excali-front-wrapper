import { Toaster } from "@/components/ui/toaster.tsx";
import ContentWrapper from "@/components/ContentWrapper.tsx";
import { TagsContent } from "@/components/TagsContent.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useState } from "react";
import PrimaryActionButton from "@/components/buttons/PrimaryActionButton.tsx";
import { PlusCircle } from "lucide-react";
import CreateOrModifyTagDialog from "@/components/CreateOrModifyTagDialog.tsx";
import { useTranslation } from 'react-i18next';

export default function TagsManager() {
  const {t} = useTranslation();
  const [currentTagId, setCurrentTagId] = useState<string | null>(null);

  return (
    <>
      <Toaster />
      <CreateOrModifyTagDialog
        currentTagId={currentTagId}
        setCurrentTagId={setCurrentTagId}
      />
      <ContentWrapper pagePaths={["Dashboard", "Tags Manager"]}>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">{t('dashboardPage.all')}</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <PrimaryActionButton
                onClickHandler={() => setCurrentTagId("new")}
                icon={<PlusCircle className="h-3.5 w-3.5" />}
              >
                {t('dashboardPage.tags.modal.create.title')}
              </PrimaryActionButton>
            </div>
          </div>
          <TagsContent setCurrentTagId={setCurrentTagId} />
        </Tabs>
      </ContentWrapper>
    </>
  );
}
