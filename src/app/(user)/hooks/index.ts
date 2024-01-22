import { useFetchArticles } from './use-fetch-articles';
import { useTabs } from './useTabs';

export const useHooks = () => {
  const { articles, fetchError, fetchStudyError, isLoading } = useFetchArticles();

  const { activeTab, handleTabChange, tabItems } = useTabs();

  return { articles, fetchError, fetchStudyError, isLoading, activeTab, handleTabChange, tabItems };
};
