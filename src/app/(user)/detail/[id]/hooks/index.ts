import { useFindArticle } from './use-find-article';

export const useHooks = (id: string) => {
  const { article, findError, findStudyError, isLoading } = useFindArticle(id);

  return { article, findError, findStudyError, isLoading };
};
