import { z } from 'zod';

export const editCanvasFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Canvas name must be at least 2 characters.',
	}),
	selectedTags: z.array(z.string()),
});

export type EditCanvasFormSchema = z.infer<typeof editCanvasFormSchema>;
