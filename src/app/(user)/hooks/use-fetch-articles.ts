import { useEffect } from 'react';

import { useFetchArticlesApi } from '~/features/article/hooks/use-fetch-articles-api';

export const useFetchArticles = () => {
  const { articles, error, studyError, isLoading, query } = useFetchArticlesApi();

  useEffect(() => {
    query();
  }, []);

  return { articles, fetchError: error, fetchStudyError: studyError, isLoading, refetch: query };
};
