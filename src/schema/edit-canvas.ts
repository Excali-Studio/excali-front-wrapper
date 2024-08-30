import { z } from "zod";
import { t } from "i18next";

export const editCanvasFormSchema = z.object({
  name: z.string().min(2, {
    message: t("dashboardPage.canvases.modal.form.validation.name", {
      number: 2,
    }),
  }),
  selectedTags: z.array(z.string()),
});

export type EditCanvasFormSchema = z.infer<typeof editCanvasFormSchema>;
