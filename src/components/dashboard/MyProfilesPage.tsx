import styles from './MyProfilesPage.module.css';
import DashboardCard from './DashboardCard';
import { Profile } from '@prisma/client';

function MyProfilesPage({ profiles }: { profiles: Profile[] }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
      )}
      {profiles.map((i) => (
        <DashboardCard key={i.id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default MyProfilesPage;
