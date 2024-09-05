import { z } from 'zod';
import { t } from 'i18next';

export const editCanvasFormSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: t('validation.min', {
				field: t('components.editCanvasDialog.form.fields.name'),
				number: 3,
			}),
		})
		.max(255, {
			message: t('validation.max', {
				field: t('components.editCanvasDialog.form.fields.name'),
				number: 255,
			}),
		}),
	selectedTags: z.array(z.string()),
});

export type EditCanvasFormSchema = z.infer<typeof editCanvasFormSchema>;
