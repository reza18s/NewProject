import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignupPage from '@/components/auth/SignupPage';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Signup() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return <SignupPage />;
}

export default Signup;
