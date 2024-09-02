import { z } from 'zod';
import { t } from 'i18next';

export const createCanvasFormSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: t('validation.min', {
				field: t('createCanvasDialog.form.fields.name'),
				number: 3,
			}),
		})
		.max(255, {
			message: t('validation.max', {
				field: t('createCanvasDialog.form.fields.name'),
				number: 255,
			}),
		}),
});
