import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';
import { Profile } from '@prisma/client';

const AdCard = ({
  data: { id, title, description, location, price },
  profileImg,
  adImg,
}: {
  data: Profile;
  adImg: string;
  profileImg: string;
}) => {
  return (
    <div className={styles.adCard}>
      <div className={styles.adImgContainer}>
        <Image
          src={adImg}
          alt="Ad"
          className={styles.adImg}
          width={150}
          height={100}
        />
      </div>
      <div className={styles.adContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
        <p className={styles.location}>{location}</p>
        <p className={styles.username}>{'user'}</p>
      </div>
      <div className={styles.profile}>
        <Image
          src={profileImg}
          alt="Profile"
          className={styles.profileImg}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default AdCard;
