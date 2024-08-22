import Link from 'next/link';
import { HiFilter } from 'react-icons/hi';
import { categories } from '@/constants/strings';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <p>
          <HiFilter />
          دسته بندی
        </p>
        <Link href="/">همه</Link>
        {Object.keys(categories).map((i) => (
          <Link
            key={i}
            href={{
              pathname: '/',
              query: { category: i },
            }}
          >
            {
              // @ts-ignore
              categories[i]
            }
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
