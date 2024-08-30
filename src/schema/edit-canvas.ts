import { z } from 'zod';
import { t } from 'i18next';

export const editCanvasFormSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: t('dashboardPage.canvases.modal.form.validation.name.min', {
				number: 3,
			}),
		})
		.max(255, {
			message: t('dashboardPage.canvases.modal.form.validation.name.max', {
				number: 255,
			}),
		}),
	selectedTags: z.array(z.string()),
});

export type EditCanvasFormSchema = z.infer<typeof editCanvasFormSchema>;
