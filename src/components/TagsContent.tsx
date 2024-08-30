import { useQuery } from "@tanstack/react-query";
import { ExcaliApi } from "@/lib/api/excali-api.ts";
import { TabsContent } from "@/components/ui/tabs.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { TagsTable } from "@/components/TagsTable.tsx";
import { useTranslation } from 'react-i18next';

const CANVAS_TAGS_KEY = "canvas-tags";

interface TagsContentProps {
  setCurrentTagId: (tagId: string | null) => void;
}

export function TagsContent({ setCurrentTagId }: TagsContentProps) {
  const {t} = useTranslation();
  const { data: tags, isLoading } = useQuery({
    queryKey: [CANVAS_TAGS_KEY],
    queryFn: () => ExcaliApi.getCanvasTags(),
  });

  return (
    <>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>{t('dashboardPage.tags.title')}</CardTitle>
            <CardDescription>{t('dashboardPage.tags.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsTable
              tags={tags}
              isLoading={isLoading}
              setCurrentTagId={setCurrentTagId}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
