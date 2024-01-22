import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyChip } from '~/components/elements/chips/chip';
import { ArticleUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = {
  articles: ArticleUiModel[];
  onClickDelete: (id: string) => void;
  isDeleting?: boolean;
};

export const MyArticleList = ({ articles, onClickDelete, isDeleting }: Props) => {
  if (!articles.length) {
    return <div>記事がありません。作成をして記事を残しましょう！</div>;
  }

  return (
    <ul className={styles.root}>
      {articles.map((article) => (
        <li key={article.id} className={styles.article}>
          <div className={styles.body}>
            <div className={styles.sub}>
              {article.status === '下書き' && <MyChip color="secondary" label={article.status}></MyChip>}
              <div className={styles.datetime}>{article.createdAt}</div>
            </div>
            <Link href={`/admin/update/${article.id}`} className={styles.content}>
              {article.title}
            </Link>
          </div>
          <div className={styles.actions}>
            <div>
              <MyButton color="secondary" size="small" asChild>
                <a href={`/admin/update/${article.id}`}>編集</a>
              </MyButton>
            </div>
            <div>
              <MyButton size="small" onClick={() => onClickDelete(article.id)} disabled={isDeleting}>
                {isDeleting ? '削除中' : '削除'}
              </MyButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
