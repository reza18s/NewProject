"use client";

import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from "./SignupPage.module.css";
import Loader from "../global/Loader";
import { useRouter } from "next/navigation";

function SigninPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            onClick={async (e) => {
              console.log(phoneNumber);
              e.preventDefault();
              setLoading(true);
              const res = await fetch(
                "http://localhost:4000/api/v1/users/signin",
                {
                  method: "POST",
                  body: JSON.stringify({
                    phoneNumber,
                  }),
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                },
              );
              const data = await res.json();
              setLoading(false);
              // if (res.ok) {
              //   router.push("/");
              // } else {
              //   toast.error(data.error);
              // }
            }}
          >
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
