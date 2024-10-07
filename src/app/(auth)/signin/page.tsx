import SigninPage from "@/components/auth/signinPage";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Signin() {
  const cookieStore = cookies().get("jwt");
  const user = await getSession(cookieStore?.value);
  if (user) {
    redirect("/");
  }
  return <SigninPage />;
}

export default Signin;
