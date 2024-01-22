import { useEffect } from 'react';

import { useFindArticleApi } from '~/features/article/hooks/use-find-article-api';

export const useFindArticle = (id: string) => {
  const { article, error, studyError, isLoading, query } = useFindArticleApi(id);

  useEffect(() => {
    query();
  }, []);

  return { article, findError: error, findStudyError: studyError, isLoading };
};
