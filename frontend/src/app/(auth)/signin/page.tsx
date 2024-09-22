import SigninPage from "@/components/auth/SigninPage";
import { getSession } from "@/utils/query";
import { redirect } from "next/navigation";

async function Signin() {
  const user = await getSession();
  if (user) {
    redirect("/");
  }
  return <SigninPage />;
}

export default Signin;
