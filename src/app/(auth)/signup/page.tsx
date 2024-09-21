import SignupPage from "@/components/auth/SignupPage";
import { getSession } from "@/utils/query";
import { redirect } from "next/navigation";
async function Signup() {
  const user = await getSession();
  if (user) {
    redirect("/");
  }
  return <SignupPage />;
}

export default Signup;
