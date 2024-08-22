'use client';

import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import styles from './LogoutButton.module.css';

function LogoutButton() {
  return (
    <button
      className={styles.button}
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <FiLogOut />
      خروج
    </button>
  );
}

export default LogoutButton;
