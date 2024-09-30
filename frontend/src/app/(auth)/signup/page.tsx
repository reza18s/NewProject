import SignupPage from "@/components/auth/signupPage";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
async function Signup() {
  const cookieStore = cookies().get("jwt");
  const user = await getSession(cookieStore?.value);
  if (user) {
    redirect("/");
  }
  return <SignupPage />;
}

export default Signup;
