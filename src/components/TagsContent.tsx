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

const CANVAS_TAGS_KEY = "canvas-tags";


export function TagsContent() {
  const { data: tags, isLoading } = useQuery({
    queryKey: [CANVAS_TAGS_KEY],
    queryFn: () => ExcaliApi.getCanvasTags(),
  });

  return (
    <>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>All canvas tag list</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsTable
              tags={tags}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
