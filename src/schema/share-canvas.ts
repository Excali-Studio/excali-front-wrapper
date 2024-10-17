import { z } from 'zod';
export const shareCanvasByTagSchema = z.object({
	tagIds: z.array(z.string()),
	personIds: z.array(z.string()),
});

export type ShareCanvasByTag = z.infer<typeof shareCanvasByTagSchema>;

export const shareCanvasByIdSchema = z.object({
	personId: z.string(),
	canvasId: z.string(),
});

export type ShareCanvasById = z.infer<typeof shareCanvasByIdSchema>;
