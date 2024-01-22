import { useEffect, useState } from 'react';

import { useMutateFetch } from '~/features/app/hooks/use-mutate-fetch';

type ApiResponseData = { id: string };

export const useDeleteArticleApi = () => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, studyError, isLoading, mutate } = useMutateFetch<ApiResponseData>(
    `http://localhost:8000/admin/articles/:id`,
    'delete',
  );

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, studyError, isDeleting: isLoading, deleteArticle: mutate };
};
