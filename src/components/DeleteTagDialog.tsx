import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from 'react-i18next';

interface DeleteTagDialogProps {
  deleteTagId: string | null;
  closeDialog: () => void;
  onSubmit: () => void;
}

export function DeleteTagDialog({
  closeDialog,
  deleteTagId,
  onSubmit,
}: DeleteTagDialogProps) {
  const {t} = useTranslation();
  return (
    <Dialog open={deleteTagId !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboardPage.tags.modal.delete.title")}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button onClick={closeDialog} variant="ghost">
            {t('components.buttons.cancel')}
          </Button>
          <Button onClick={onSubmit}>{t('components.buttons.delete')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
