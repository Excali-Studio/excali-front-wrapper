import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  CreateOrModifyTagFormSchema,
  createOrModifyTagFormSchema,
} from "@/schema/create-or-modify-tag.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useEffect } from "react";
import { useCreateOrModifyTag } from "@/hooks/useCreateOrModifyTag.ts";
import { useTranslation } from "react-i18next";

type CurrentTagId = string | null;

interface CreateOrModifyCanvasDialogProps {
  currentTagId: CurrentTagId;
  setCurrentTagId: (tagId: CurrentTagId) => void;
}

export default function CreateOrModifyTagDialog({
  currentTagId,
  setCurrentTagId,
}: CreateOrModifyCanvasDialogProps) {
  const isOpen = currentTagId !== null;
  const { t } = useTranslation();

  const form = useForm<CreateOrModifyTagFormSchema>({
    resolver: zodResolver(createOrModifyTagFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { tagDetails, createTagHandler, updateTagHandler } =
    useCreateOrModifyTag(currentTagId, () => setCurrentTagId(null), form.reset);

  useEffect(() => {
    if (tagDetails) {
      form.setValue("name", tagDetails.name);
      tagDetails.color && form.setValue("color", tagDetails.color);
      tagDetails.description &&
        form.setValue("description", tagDetails.description);
    }
  }, [form, tagDetails]);

  function onSubmit(formValues: CreateOrModifyTagFormSchema) {
    currentTagId === "new"
      ? createTagHandler(formValues)
      : updateTagHandler(formValues);
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setCurrentTagId(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t("dashboardPage.tags.modal.create.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("dashboardPage.tags.modal.form.fields.name")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("dashboardPage.tags.modal.form.fields.description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>
                        {t("dashboardPage.tags.modal.form.fields.color")}
                      </FormLabel>
                      <div className="flex items-center gap-2">
                        <p className="font-mono">{field.value}</p>
                        <FormControl>
                          <Input
                            type="color"
                            {...field}
                            className="w-[50px] cursor-pointer"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {t("dashboardPage.tags.modal.saveTagButton")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
