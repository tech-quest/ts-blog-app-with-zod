import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCreateArticleApi } from '~/features/article/hooks/use-create-article-api';
import { ArticleCategory, ArticleStatus } from '~/features/article/ui-models/article';

export const useHooks = () => {
  const router = useRouter();
  const { success, error, studyError, isCreating, createArticle } = useCreateArticleApi();

  const handleSubmit = (title: string, content: string, category: ArticleCategory, status: ArticleStatus) => {
    createArticle({ title, content, category, status });
  };

  useEffect(() => {
    if (!success) return;
    router.push('/admin');
  }, [success]);

  return { error, studyError, isCreating, handleSubmit };
};
