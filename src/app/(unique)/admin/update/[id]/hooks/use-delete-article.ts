import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useDeleteArticleApi } from '~/features/article/hooks/use-delete-article-api';

export const useDeleteArticle = (id: string) => {
  const router = useRouter();
  const { success, error, studyError, isDeleting, deleteArticle } = useDeleteArticleApi();

  const handleDelete = () => {
    deleteArticle(undefined, { url: `http://localhost:8000/admin/articles/${id}` });
  };

  useEffect(() => {
    if (!success) return;
    router.push('/admin');
  }, [success]);

  return { deleteError: error, deleteStudyError: studyError, isDeleting, handleDelete };
};
