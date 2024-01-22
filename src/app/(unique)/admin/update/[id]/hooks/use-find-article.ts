import { useEffect, useState } from 'react';

import { DefaultValues } from '~/app/(unique)/admin/update/[id]/components/update-article-form';
import { useFindArticleApi } from '~/features/article/hooks/use-find-article-api';
import { ArticleCategory, ArticleStatus } from '~/features/article/ui-models/article';

export const useFindArticle = (id: string) => {
  const [defaultValues, setDefaultValues] = useState<DefaultValues | null>();

  const { article, error, studyError, isLoading, query } = useFindArticleApi(id, true);

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (!article) return;
    setDefaultValues({
      title: article.title,
      content: article.content,
      category: article.category as ArticleCategory,
      status: article.status as ArticleStatus,
    });
  }, [article]);

  return { defaultValues, findError: error, findStudyError: studyError, isLoading };
};
