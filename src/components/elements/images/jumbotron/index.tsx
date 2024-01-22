import { StaticImageData } from 'next/image';

import { MyFluidImage } from '~/components/elements/images/fluid-image';

import styles from './styles.module.css';

type Props = {
  heading: string;
  image: string | StaticImageData;
};

export const MyJumbotron = ({ heading, image }: Props) => {
  return (
    <header className={styles.root}>
      <h1 className={styles.heading}>{heading}</h1>
      <figure className={styles.image}>
        <MyFluidImage src={image} />
      </figure>
    </header>
  );
};
