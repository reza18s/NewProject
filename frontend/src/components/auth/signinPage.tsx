"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./signupPage.module.css";
import Loader from "../global/Loader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
              e.preventDefault();
              try {
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
                console.log(res.headers.getSetCookie());
                const data = await res.json();
                setLoading(false);
                if (res.ok) {
                  router.push("/");
                } else {
                  toast.success(data.error.message);
                }
              } catch (error) {
                console.log();
              }
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
    </div>
  );
}

export default SigninPage;
