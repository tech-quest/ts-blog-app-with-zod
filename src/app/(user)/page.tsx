'use client';

import { MyJumbotron } from '~/components/elements/images/jumbotron';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyContainer } from '~/features/app/components/container';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';

import heroImage from './assets/images/picture-hero-image.jpg';
import { MyArticles } from './components/articles';
import { useHooks } from './hooks';

export default function HomePage() {
  const { articles, fetchError, fetchStudyError, isLoading, activeTab, handleTabChange, tabItems } = useHooks();

  return (
    <MyPageContainer>
      <MyJumbotron heading="Articles" image={heroImage} />
      <MyContainer>
        {fetchError && <MyAlertMessage color="error">{fetchError.message}</MyAlertMessage>}
        {isLoading ? (
          <div>読み込み中...</div>
        ) : (
          <MyArticles
            articles={articles}
            tabsProps={{ items: tabItems, value: activeTab, onChange: handleTabChange }}
          />
        )}
        {fetchStudyError && (
          <MyStudyAlert
            message={fetchStudyError.message}
            description="API (http://localhost:8000/articles) の開発が完了すると「記事の一覧」が表示されるようになります。"
          />
        )}
      </MyContainer>
    </MyPageContainer>
  );
}
