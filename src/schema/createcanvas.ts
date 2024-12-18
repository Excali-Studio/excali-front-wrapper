import { z } from 'zod';
import { t } from 'i18next';

export const createCanvasFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, {
			message: t('validation.min', {
				field: t('components.createCanvasDialog.form.fields.name'),
				number: 3,
			}),
		})
		.max(255, {
			message: t('validation.max', {
				field: t('components.createCanvasDialog.form.fields.name'),
				number: 255,
			}),
		}),
});
