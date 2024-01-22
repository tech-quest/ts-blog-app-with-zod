'use client';

import lifeImage from '~/app/(user)/assets/images/picture-article-life.jpg';
import programmingImage from '~/app/(user)/assets/images/picture-article-programming.jpg';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyContainer } from '~/features/app/components/container';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';

import { MyArticleActions } from './components/article-actions';
import { MyArticleDetail } from './components/article-detail';
import { MyArticleJumbotron } from './components/article-jumbotron';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function ArticleDetailPage({ params }: { params: Params }) {
  const { article, findError, findStudyError, isLoading } = useHooks(params.id);

  return (
    <MyPageContainer>
      <MyArticleJumbotron
        heading={article?.title ?? ''}
        createdAt={article?.createdAt ?? ''}
        updatedAt={article?.updatedAt ?? ''}
        image={article ? (article.category === 'プログラミング' ? programmingImage : lifeImage) : undefined}
        tag={article?.category}
      />
      <MyContainer>
        {findError && <MyAlertMessage color="error">{findError.message}</MyAlertMessage>}
        {isLoading && <div>読み込み中...</div>}
        {article && <MyArticleDetail article={article} />}
        <MyArticleActions />
      </MyContainer>
      {findStudyError && (
        <MyStudyAlert
          message={findStudyError.message}
          description="API (http://localhost:8000/articles/:id) の開発が完了すると「選択した記事の詳細」が表示されるようになります。"
        />
      )}
    </MyPageContainer>
  );
}
