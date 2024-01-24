import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUpdateArticleApi } from '~/features/article/hooks/use-update-article-api';
import { ArticleCategory, ArticleStatus } from '~/features/article/ui-models/article';

export const useUpdateArticle = (id: string) => {
  const router = useRouter();

  const { success, error, studyError, isUpdating, updateArticle } = useUpdateArticleApi(id);

  const handleSubmit = (title: string, content: string, category: ArticleCategory, status: ArticleStatus) => {
    updateArticle({ title, content, category, status });
  };

  useEffect(() => {
    if (!success) return;
    router.push('/admin');
  }, [success]);

  return { updateError: error, updateStudyError: studyError, isUpdating, handleSubmit };
};
