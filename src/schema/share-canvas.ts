import { z } from 'zod';
export const shareCanvasSchema = z.object({
	tagIds: z.array(z.string()),
	personIds: z.array(z.string()),
});

export type ShareCanvas = z.infer<typeof shareCanvasSchema>;
