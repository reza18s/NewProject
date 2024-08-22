import styles from './AdminPage.module.css';
import AdminCard from './AdminCard';
import { Profile } from '@prisma/client';

function AdminPage({ profiles }: { profiles: Profile[] }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی در انتظار تاییدی وجود ندارد</p>
      )}
      {profiles.map((i) => (
        <AdminCard key={i.id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
