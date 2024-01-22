import { useDeleteArticle } from './use-delete-article';
import { useFindArticle } from './use-find-article';
import { useUpdateArticle } from './use-update-article';

export const useHooks = (id: string) => {
  const { defaultValues, findError, findStudyError, isLoading } = useFindArticle(id);
  const { updateError, updateStudyError, isUpdating, handleSubmit } = useUpdateArticle(id);
  const { deleteError, deleteStudyError, isDeleting, handleDelete } = useDeleteArticle(id);

  return {
    defaultValues,
    findError,
    findStudyError,
    isLoading,
    updateError,
    updateStudyError,
    isUpdating,
    handleSubmit,
    deleteError,
    deleteStudyError,
    isDeleting,
    handleDelete,
  };
};
