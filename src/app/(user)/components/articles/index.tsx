import Link from 'next/link';
import React from 'react';

import lifeImage from '~/app/(user)/assets/images/picture-article-life.jpg';
import programmingImage from '~/app/(user)/assets/images/picture-article-programming.jpg';
import { MyChip } from '~/components/elements/chips/chip';
import { MyFluidImage } from '~/components/elements/images/fluid-image';
import { MyTabs } from '~/components/surface/navigations/tabs';
import { ArticleUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type TabsProps = React.ComponentProps<typeof MyTabs>;

type Props = {
  articles: ArticleUiModel[];
  tabsProps: TabsProps;
};

export const MyArticles = ({ articles, tabsProps }: Props) => {
  if (!articles.length) {
    return <div>記事がありません。作成をして記事を残しましょう！</div>;
  }

  const filterArticles = (value: string) => {
    return articles.filter((article) => article.category === value);
  };
  const activeArticles = tabsProps.value === 'すべて' ? articles : filterArticles(tabsProps.value);

  return (
    <div className={styles.root}>
      <MyTabs {...tabsProps} />
      <div className={styles.articles}>
        {activeArticles.length ? (
          activeArticles.map((article) => {
            const image = article.category === 'プログラミング' ? programmingImage : lifeImage;
            const chipColor = article.category === 'プログラミング' ? 'primary' : 'secondary';

            return (
              <article key={article.id} className={styles.article}>
                <Link href={`/detail/${article.id}`} className={styles.link}>
                  <div className={styles.body}>
                    <h2>{article.title}</h2>
                    <div className={styles.tags}>
                      <MyChip label={article.category} color={chipColor} />
                    </div>
                    <div className={styles.datetime}>{article.createdAt}</div>
                  </div>
                  <figure className={styles.image}>
                    <MyFluidImage src={image} />
                  </figure>
                </Link>
              </article>
            );
          })
        ) : (
          <div>該当の記事がありません</div>
        )}
      </div>
    </div>
  );
};
