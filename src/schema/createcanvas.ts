import { z } from 'zod';

export const createCanvasFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Canvas name must be at least 2 characters.',
	}),
});
