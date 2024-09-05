import { z } from 'zod';
import { t } from 'i18next';

export const createOrModifyTagFormSchema = z.object({
	id: z.string().optional(),
	name: z
		.string()
		.min(3, {
			message: t('validation.min', {
				field: t('components.createOrModifyTagDialog.form.fields.name'),
				number: 3,
			}),
		})
		.max(12, {
			message: t('validation.max', {
				field: t('components.createOrModifyTagDialog.form.fields.name'),
				number: 12,
			}),
		}),
	color: z.string(),
	description: z.string().optional(),
});

export type CreateOrModifyTagFormSchema = z.infer<
	typeof createOrModifyTagFormSchema
>;
