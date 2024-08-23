import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import { db } from "@/lib/db";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        // @ts-ignore
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("لطفا اطلاعات معتبر وارد کنید");
        }
        const user = await db.users.findUnique({ where: { email } });
        if (!user) {
          throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");
        }
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("ایمیل یا رمز عبور اشتباه است");
        }

        return { email };
      },
    }),
  ],
};
// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
