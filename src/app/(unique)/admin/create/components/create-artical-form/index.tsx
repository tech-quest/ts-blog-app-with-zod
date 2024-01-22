import { useState } from 'react';

import { MyButton } from '~/components/elements/buttons/button';
import { MyRadioField } from '~/components/elements/forms/radio-field';
import { MySelectField } from '~/components/elements/forms/select-field';
import { MyTextField } from '~/components/elements/forms/text-field';
import { MyTextareaField } from '~/components/elements/forms/textarea-field';
import { MyPanel } from '~/components/surface/panels/panel';
import { ArticleCategory, ArticleStatus, categoryItems, statusItems } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = {
  isSubmitting: boolean;
  onSubmit: (title: string, content: string, category: ArticleCategory, status: ArticleStatus) => void;
};

export const MyCreateArticleForm = ({ isSubmitting, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('プログラミング');
  const [status, setStatus] = useState<ArticleStatus>('公開');

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };
  const handleChangeContent = (value: string) => {
    setContent(value);
  };
  const handleChangeCategory = (value) => {
    setCategory(value);
  };
  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, content, category, status);
  };

  return (
    <MyPanel>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MyTextField label="タイトル" name="title" value={title} onChange={handleChangeTitle} />
        <MyTextareaField label="内容" name="content" value={content} onChange={handleChangeContent} />
        <MySelectField
          items={categoryItems}
          label="カテゴリー"
          name="category"
          value={category}
          onChange={handleChangeCategory}
        />
        <MyRadioField
          items={statusItems}
          label="ステータス"
          name="status"
          value={status}
          onChange={handleChangeStatus}
        />
        <div>
          <MyButton type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? '送信中' : '作成'}
          </MyButton>
        </div>
      </form>
    </MyPanel>
  );
};
