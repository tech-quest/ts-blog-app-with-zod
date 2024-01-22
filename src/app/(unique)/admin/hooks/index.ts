import { useDeleteArticle } from './use-delete-article';
import { useFetchArticles } from './use-fetch-articles';

export const useHooks = () => {
  const { articles, fetchError, fetchStudyError, isLoading, refetch } = useFetchArticles();
  const { deleteError, deleteStudyError, isDeleting, deleteArticle } = useDeleteArticle();

  const handleDelete = async (id: string) => {
    await deleteArticle({ articleId: id });
    await refetch();
  };

  return { articles, fetchError, fetchStudyError, isLoading, deleteError, deleteStudyError, isDeleting, handleDelete };
};
