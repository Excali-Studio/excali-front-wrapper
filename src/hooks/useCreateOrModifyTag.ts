import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExcaliApi } from "@/lib/api/excali-api.ts";
import { CreateOrModifyTagFormSchema } from "@/schema/create-or-modify-tag.ts";
import { toast } from "@/components/ui/use-toast.ts";
import {useModalStore} from '@/store/modalStore.ts';

export function useCreateOrModifyTag(
  currentTagId: string | null,
  resetForm: () => void,
) {
  const queryClient = useQueryClient();
  const { closeModal, resetState } = useModalStore();

  const { data: tagDetails } = useQuery({
    queryKey: ["canvas-tag-details", currentTagId],
    queryFn: () => ExcaliApi.getTagById(`${currentTagId}`),
    enabled: Boolean(currentTagId) && currentTagId !== "new",
  });

  function onSuccess() {
    toast({
      description: "Your canvas has been saved.",
    });
    resetForm();
    closeModal()
    resetState()
    return queryClient.invalidateQueries({ queryKey: ["canvas-tags"] });
  }

  function onError() {
    toast({
      description: "An error occurred while saving the canvas.",
    });
    closeModal()
    resetState()
  }

  const { mutate: createTagHandler } = useMutation({
    mutationFn: (values: CreateOrModifyTagFormSchema) => {
      return ExcaliApi.createTag(values);
    },
    onSuccess,
    onError,
  });

  const { mutate: updateTagHandler } = useMutation({
    mutationFn: (values: CreateOrModifyTagFormSchema) => {
      return ExcaliApi.updateTag(`${currentTagId}`, values);
    },
    onSuccess,
    onError,
  });

  return { tagDetails, createTagHandler, updateTagHandler };
}
