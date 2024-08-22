'use client';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation.js';
import CityFilter from '../modals/CityFilter';
import { Button } from '../ui/button';
import CustomModal from '../modals/CustomModal';
import { useStore } from 'zustand';
import { useModal } from '@/stores/useModal';

function Header() {
  const store = useStore(useModal, (state) => state);
  const { data: session } = useSession();
  const router = useRouter();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URLSearchParams(window.location.search);
    url.set('search', e.target.value);
    router.push('/?' + url.toString());
  };
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.rightSection}>
          <Button
            onClick={() => {
              store.setOpen(
                <CustomModal
                  title="Create a Subaccount"
                  subheading="You can switch between"
                >
                  <CityFilter />
                </CustomModal>,
              );
            }}
          >
            تهران
          </Button>
          <form className={styles.searchForm}>
            <input
              onChange={handleSearchQuery}
              type="text"
              placeholder="جستجوی آگهی"
            />
            <button type="submit">جستجو</button>
          </form>
        </div>
        <div className={styles.centerSection}>
          <Link href="/" legacyBehavior>
            <Image src="/image/logo.png" width={70} height={70} alt="Logo" />
          </Link>
        </div>
        <div className={styles.leftSection}>
          <h5 className={styles.phone}>021-123456</h5>
          <div className={styles.navbarButton}>
            <button className={styles.panel}>پنل اختصاصی من</button>
            {session ? (
              <div className={styles.login}>
                <Link href="/dashboard">
                  <FaUserAlt />
                </Link>
              </div>
            ) : (
              <div className={styles.login}>
                <Link href="/signin">
                  <span>ورود / ثبت نام</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
