import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useDeleteArticleApi } from '~/features/article/hooks/use-delete-article-api';

export const useDeleteArticle = () => {
  const router = useRouter();

  const { success, error, studyError, isDeleting, deleteArticle } = useDeleteArticleApi();

  useEffect(() => {
    if (!success) return;
    router.push('/admin');
  }, [success]);

  return { deleteError: error, deleteStudyError: studyError, isDeleting, deleteArticle };
};
