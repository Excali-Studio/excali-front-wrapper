import { z } from "zod";
import { t } from 'i18next';

export const createOrModifyTagFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: t("dashboardPage.tags.modal.form.validation.name", {
      number: 2,
    }),
  }),
  color: z.string(),
  description: z.string().optional(),
});

export type CreateOrModifyTagFormSchema = z.infer<
	typeof createOrModifyTagFormSchema
>;
