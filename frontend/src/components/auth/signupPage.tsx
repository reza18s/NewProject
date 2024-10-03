"use client";

import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signupPage.module.css";
import Loader from "../global/Loader";
import toast from "react-hot-toast";
import axios from "axios";
function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "/api/v1/users/signup",
        {
          phoneNumber,
        },
        {
          withCredentials: true, // Include cookies with the request
        },
      );
      const data = res.data;
      setLoading(false);
      if (res.data) {
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        toast.error(data.error.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.form}>
      <h4>فرم ثبت نام</h4>
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
          <button type="submit" onClick={signupHandler}>
            ثبت نام
          </button>
        )}
      </form>
      <p>
        حساب کاربری دارید؟
        <Link href="/signin">ورود</Link>
      </p>
    </div>
  );
}

export default SignupPage;
