import { useState } from 'react';

import { useDeleteArticle } from './use-delete-article';
import { useFetchArticles } from './use-fetch-articles';

export const useHooks = () => {
  const { articles, fetchError, fetchStudyError, isLoading, refetch } = useFetchArticles();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const { deleteError, deleteStudyError, isDeleting, deleteArticle } = useDeleteArticle(currentId);

  const handleDelete = async (id: string) => {
    setCurrentId(id);
    await deleteArticle({ id });
    await refetch();
  };

  return { articles, fetchError, fetchStudyError, isLoading, deleteError, deleteStudyError, isDeleting, handleDelete };
};
