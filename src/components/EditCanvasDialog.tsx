import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { ComboBox } from "@/components/ComboBox.tsx";
import { useEditCanvasForm } from "@/hooks/useEditCanvasForm.ts";
import { useTranslation } from "react-i18next";

type CanvasIdValue = string | null;

interface EditCanvasDialogProps {
  canvasId: CanvasIdValue;
  onClose: () => void;
}

export default function EditCanvasDialog({
  canvasId,
  onClose,
}: EditCanvasDialogProps) {
  const { t } = useTranslation();
  const { form, onSubmit, tags, selectedTagsName, onSelect } =
    useEditCanvasForm(canvasId, onClose);

  const isOpen = typeof canvasId === "string";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t("dashboardPage.canvases.modal.edit.title")}
          </DialogTitle>
          <DialogDescription>
            {t("dashboardPage.canvases.modal.edit.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("dashboardPage.canvases.modal.form.fields.name")}
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
                name="selectedTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("dashboardPage.canvases.modal.form.fields.tags")}
                    </FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder="Select tags..."
                        selectedData={field.value}
                        selectedValueLabel={selectedTagsName}
                        onSelect={onSelect}
                        data={tags}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{t('dashboardPage.canvases.modal.saveCanvasButton')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
