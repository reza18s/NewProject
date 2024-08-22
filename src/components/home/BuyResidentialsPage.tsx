'use client';
import styles from './BuyResidentialsPage.module.css';
import Sidebar from '../sidebar/Sidebar';
import { Profile } from '@prisma/client';
import AdList from '../Ads/AdList';

function BuyResidentialsPage({ data }: { data: Profile[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        {!data || data.length === 0 ? (
          <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
        ) : (
          data.map((profile) => <AdList key={profile.id} data={profile} />)
        )}
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
