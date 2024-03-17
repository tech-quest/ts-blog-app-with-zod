import { useState } from 'react';

import { FieldError } from '~/app/(unique)/admin/field-error-types';
import { DefaultValues } from '~/app/(unique)/admin/update/[id]/default-values';
import { MyButton } from '~/components/elements/buttons/button';
import { MyRadioField } from '~/components/elements/forms/radio-field';
import { MySelectField } from '~/components/elements/forms/select-field';
import { MyTextField } from '~/components/elements/forms/text-field';
import { MyTextareaField } from '~/components/elements/forms/textarea-field';
import { MyPanel } from '~/components/surface/panels/panel';
import { ArticleCategory, ArticleStatus, categoryItems, statusItems } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = {
  defaultValues: DefaultValues;
  isSubmitting: boolean;
  onSubmit: (title: string, content: string, category: ArticleCategory, status: ArticleStatus) => void;
  errors: FieldError;
};

export const MyUpdateArticleForm = ({ defaultValues, isSubmitting, onSubmit, errors }: Props) => {
  const [title, setTitle] = useState(defaultValues.title);
  const [content, setContent] = useState(defaultValues.content);
  const [category, setCategory] = useState<ArticleCategory>(defaultValues.category);
  const [status, setStatus] = useState<ArticleStatus>(defaultValues.status);

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
        <MyTextField label="タイトル" name="title" value={title} onChange={handleChangeTitle} error={errors?.title} />
        <MyTextareaField
          label="内容"
          name="content"
          value={content}
          onChange={handleChangeContent}
          error={errors?.content}
        />
        <MySelectField
          items={categoryItems}
          label="カテゴリー"
          name="category"
          value={category}
          onChange={handleChangeCategory}
          error={errors?.category}
        />
        <MyRadioField
          items={statusItems}
          label="ステータス"
          name="status"
          value={status}
          onChange={handleChangeStatus}
          error={errors?.status}
        />
        <div>
          <MyButton type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? '送信中' : '保存'}
          </MyButton>
        </div>
      </form>
    </MyPanel>
  );
};
