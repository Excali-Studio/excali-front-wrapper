import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { getContrastText } from "@/lib/contrast-text.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal } from "lucide-react";
import { CanvasTagDTO, ExcaliApi } from "@/lib/api/excali-api.ts";
import { TagsTableSkeletonLoading } from "@/components/TagsTableSkeletonLoading.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTagDialog } from "@/components/DeleteTagDialog.tsx";
import { useTranslation } from "react-i18next";

interface TagsTableProps {
  tags: CanvasTagDTO[] | undefined;
  isLoading: boolean;
  setCurrentTagId: (tagId: string | null) => void;
}

export function TagsTable({
  tags,
  isLoading,
  setCurrentTagId,
}: TagsTableProps) {
  const queryClient = useQueryClient();
  const [deleteTagId, setDeleteTagId] = useState<string | null>(null);
  const { t } = useTranslation();

  const { mutate: deleteTagHandler } = useMutation({
    mutationFn: (tagId: string) => ExcaliApi.deleteTag(tagId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["canvas-tags"] }),
  });

  return (
    <>
      <DeleteTagDialog
        deleteTagId={deleteTagId}
        closeDialog={() => setDeleteTagId(null)}
        onSubmit={() => {
          deleteTagHandler(`${deleteTagId}`);
          setDeleteTagId(null);
        }}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("dashboardPage.tags.table.name")}</TableHead>
            <TableHead className="hidden md:table-cell">
              {t("dashboardPage.tags.table.color")}
            </TableHead>
            <TableHead className="hidden md:table-cell">
              {t("dashboardPage.tags.table.description")}
            </TableHead>
            <TableHead>
              {t("dashboardPage.tags.table.actions")}
              <span className="sr-only">
                {t("dashboardPage.tags.table.actions")}
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags && !isLoading ? (
            <>
              {tags.map((value, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <TableRow className={"cursor-pointer"}>
                      <TableCell className="font-medium">
                        {value.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          style={{
                            background: value.color ?? "unset",
                            color: value.color
                              ? getContrastText(value.color)
                              : "unset",
                          }}
                        >
                          {value.color || "No color"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {value.description}
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
                              <span className="sr-only"> {t("components.common.toggleMenu")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {t("components.common.actions")}
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => setCurrentTagId(value.id)}
                            >
                              {t("components.buttons.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteTagId(value.id)}
                            >
                              {t("components.buttons.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <TagsTableSkeletonLoading />
          )}
        </TableBody>
      </Table>
    </>
  );
}
