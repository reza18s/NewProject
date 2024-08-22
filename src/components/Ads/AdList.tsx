'use client';
import React from 'react';
import AdCard from './Card';
import styles from './AdList.module.css';
import { Profile } from '@prisma/client';

const AdList = ({ data }: { data: Profile }) => {
  return (
    <div className={styles.container}>
      <div className={styles.adsSection}>
        <AdCard
          data={data}
          adImg={'/image/1.jpeg'}
          profileImg={'/image/2.jpg'}
        />
      </div>
    </div>
  );
};

export default AdList;
