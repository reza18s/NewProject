import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { db } from '@/lib/db';

export const metadata = {
  title: 'پنل کاربری املاک | پروژه بوتواستارت',
};

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/signin');
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return (
    <DashboardSidebar role={user.role} email={user.email}>
      {children}
    </DashboardSidebar>
  );
}

export default DashboardLayout;
