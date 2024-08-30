import { z } from "zod";
import { t } from "i18next";

export const createCanvasFormSchema = z.object({
  name: z.string().min(2, {
    message: t("dashboardPage.canvases.modal.form.validation.name", {
      number: 2,
    }),
  }),
});
