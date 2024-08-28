import { z } from 'zod';

export const createOrModifyTagFormSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2, {
		message: 'Tag name must be at least 2 characters.',
	}),
	color: z.string(),
	description: z.string(),
});

export type CreateOrModifyTagFormSchema = z.infer<
	typeof createOrModifyTagFormSchema
>;
