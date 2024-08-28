import { z } from "zod";

export const createOrModifyTagFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, {
    message: "Tag name must be at least 3 characters.",
  }).max(12, {
    message: "Tag name can't be longer than 12 characters."
  }),
  color: z.string(),
  description: z.string().optional(),
});

export type CreateOrModifyTagFormSchema = z.infer<
  typeof createOrModifyTagFormSchema
>;
