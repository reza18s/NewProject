import SigninPage from "@/components/auth/SigninPage";
import { cookies } from "next/headers";

async function Signin() {
  const cookieStore = cookies();
  const response = await fetch(
    `${process.env.BACKEND_SERVER_URL}/users/get-me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("jwt")?.value}`,
      },
    },
  );
  console.log(await response.json());
  return <SigninPage />;
}

export default Signin;
