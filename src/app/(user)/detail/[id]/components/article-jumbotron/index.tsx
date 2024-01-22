import { StaticImageData } from 'next/image';

import { MyFluidImage } from '~/components/elements/images/fluid-image';

import styles from './styles.module.css';

type Props = {
  heading: string;
  createdAt: string;
  updatedAt: string;
  image?: string | StaticImageData;
  tag?: string;
};

export const MyArticleJumbotron = ({ heading, createdAt, updatedAt, image, tag }: Props) => {
  return (
    <header className={styles.root}>
      <div className={styles.body}>
        <div className={styles.times}>
          <div>作成日時: {createdAt}</div>
          <div>更新日時: {updatedAt}</div>
        </div>
        <h1 className={styles.heading}>{heading}</h1>
        {tag && <div className={styles.tag}>カテゴリー: {tag}</div>}
      </div>
      {image && (
        <figure className={styles.image}>
          <MyFluidImage src={image} />
        </figure>
      )}
    </header>
  );
};
