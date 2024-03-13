'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { MyButton } from '~/components/elements/buttons/button';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';
import { MyAdminArticleContainer } from '~/features/article/components/admin-article-container';

import { MyCreateArticleForm } from './components/create-artical-form';
import { useHooks } from './hooks';

export default function ArticleCreatePage() {
  const { error, studyError, isCreating, handleSubmit } = useHooks();
  const [fieldError, setfieldError] = useState({ title: '', content: '', category: '', status: '' });

  useEffect(() => {
    if (error && error.fields) {
      setfieldError(error.fields);
    }
  }, [error]);

  return (
    <MyPageContainer>
      <h1>新規記事作成</h1>
      <MyAdminArticleContainer>
        <MyCreateArticleForm isSubmitting={isCreating} onSubmit={handleSubmit} errors={fieldError} />
        <div>
          <MyButton asChild>
            <Link href="/admin">一覧に戻る</Link>
          </MyButton>
        </div>
      </MyAdminArticleContainer>
      {studyError && (
        <MyStudyAlert
          message={studyError.message}
          description="API (http://localhost:8000/admin/articles) の開発が完了すると作成ボタンをクリックした際に「新規記事をデータベースに登録」し、「一覧画面に戻る」ようになります。"
        />
      )}
    </MyPageContainer>
  );
}
