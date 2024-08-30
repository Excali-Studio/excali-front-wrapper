import { PlusCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExcaliApi } from "@/lib/api/excali-api.ts";
import CreateCanvasDialog from "@/components/CreateCanvasDialog.tsx";
import { useUserAuth } from "@/lib/useUserAuth.ts";
import { z } from "zod";
import { createCanvasFormSchema } from "@/schema/createcanvas.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import PrimaryActionButton from "@/components/buttons/PrimaryActionButton.tsx";
import TabsContentWrapper, {
  CANVASES_QUERY_KEY,
} from "@/components/TabsContent.tsx";
import ContentWrapper from "@/components/ContentWrapper.tsx";
import DashboardFilters from "@/components/DashboardFilters.tsx";
import { TagsFilterStoreProvider } from "@/providers/TagsFilterProvider/TagsFilterProvider.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserDashboard() {
  const [isCreateCanvasOpen, setIsCreateCanvasOpen] = useState(false);
  const { data } = useUserAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate: createCanvasHandler } = useMutation({
    mutationFn: (values: z.infer<typeof createCanvasFormSchema>) => {
      return ExcaliApi.createCanvas({
        name: values.name,
        userId: `${data}`,
      });
    },
    onSuccess: () => {
      toast({
        description: t('dashboardPage.canvases.modal.create.toast'),
      });
      setIsCreateCanvasOpen(false);
      return queryClient.invalidateQueries({ queryKey: [CANVASES_QUERY_KEY] });
    },
  });

  return (
    <TagsFilterStoreProvider>
      <CreateCanvasDialog
        isOpen={isCreateCanvasOpen}
        setIsOpen={setIsCreateCanvasOpen}
        onSubmit={createCanvasHandler}
      />
      <Toaster />
      <ContentWrapper pagePaths={["Dashboard", "Canvases"]}>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">{t('dashboardPage.all')}</TabsTrigger>
              {/*<TabsTrigger value="draft">Draft</TabsTrigger>*/}
              {/*<TabsTrigger value="archived">Archived</TabsTrigger>*/}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DashboardFilters />
              <PrimaryActionButton
                onClickHandler={() => setIsCreateCanvasOpen(true)}
                icon={<PlusCircle className="h-3.5 w-3.5" />}
              >
                {t('dashboardPage.canvases.modal.create.title')}
              </PrimaryActionButton>
            </div>
          </div>
          <TabsContentWrapper
            title={t('dashboardPage.canvases.title')}
            description={t('dashboardPage.canvases.description')}
          />
        </Tabs>
      </ContentWrapper>
    </TagsFilterStoreProvider>
  );
}
