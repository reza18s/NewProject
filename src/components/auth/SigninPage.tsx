"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import styles from "./SignupPage.module.css";
import Loader from "../global/Loader";

function SigninPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signinHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      phoneNumber,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.form}>
      <h4>فرم ورود</h4>
      <form>
        <label>شماره:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>رمز عبور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <Loader />
        ) : (
          <button type="submit" onClick={signinHandler}>
            ثبت نام
          </button>
        )}
      </form>
      <p>
        حساب کاربری ندارید؟
        <Link href="/signup">ثبت نام</Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SigninPage;
