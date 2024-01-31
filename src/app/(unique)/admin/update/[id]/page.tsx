'use client';

import { useEffect, useState } from 'react';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';
import { MyAdminArticleContainer } from '~/features/article/components/admin-article-container';

import { MyArticleActions } from './components/article-actions';
import { MyUpdateArticleForm } from './components/update-article-form';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function ArticleUpdatePage({ params }: { params: Params }) {
  const {
    defaultValues,
    findError,
    findStudyError,
    isLoading,
    updateError,
    updateStudyError,
    isUpdating,
    handleSubmit,
    deleteError,
    deleteStudyError,
    isDeleting,
    handleDelete,
  } = useHooks(params.id);

  const [fieldErrors, setFieldErrors] = useState({ title: '', content: '', category: '', status: '' });

  useEffect(() => {
    if (updateError && updateError.message) {
      const errorObj = typeof updateError.message === 'string' ? JSON.parse(updateError.message) : updateError.message;
      setFieldErrors(errorObj);
    }
  }, [updateError]);

  return (
    <MyPageContainer>
      <h1>記事編集</h1>
      <MyAdminArticleContainer>
        {findError && <MyAlertMessage color="error">{findError.message}</MyAlertMessage>}
        {deleteError && <MyAlertMessage color="error">{deleteError.message}</MyAlertMessage>}
        {!defaultValues && isLoading && <div>読み込み中...</div>}
        {defaultValues && (
          <MyUpdateArticleForm
            defaultValues={defaultValues}
            isSubmitting={isUpdating}
            onSubmit={handleSubmit}
            errors={fieldErrors}
          />
        )}
        <MyArticleActions onClickDelete={handleDelete} isDeleting={isDeleting} />
      </MyAdminArticleContainer>
      {findStudyError && (
        <MyStudyAlert
          message={findStudyError.message}
          description="API (http://localhost:8000/admin/articles/:id) の開発が完了すると「選択した記事の値が設定された編集フォーム」が表示されるようになります。"
        />
      )}
      {updateStudyError && (
        <MyStudyAlert
          message={updateStudyError.message}
          description="API (http://localhost:8000/admin/articles/:id) の開発が完了すると保存ボタンをクリックした際に「選択した記事の変更内容をデータベースに保存」し、「一覧画面に戻る」ようになります。"
        />
      )}
      {deleteStudyError && (
        <MyStudyAlert
          message={deleteStudyError.message}
          description="API (http://localhost:8000/admin/articles/:id) の開発が完了すると削除ボタンをクリックした際に「選択した記事の変更内容をデータベースから削除」し、「一覧画面に戻る」ようになります。"
        />
      )}
    </MyPageContainer>
  );
}
