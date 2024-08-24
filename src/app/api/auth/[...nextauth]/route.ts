import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import { db } from "@/lib/db";
interface Session {
  accessToken?: string;
  user: {
    id: string;
    phoneNumber: string;
    role: string;
    [key: string]: string;
  };
}
interface Token {
  accessToken?: string;
  user?: {
    _id: string;
    phoneNumber: string;
    role: string;
    [key: string]: string;
  };
}

interface User {
  id: string;
  phoneNumber: string;
  password: string;
  role: string;
  // Add more fields if needed
}
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: Token;
    }): Promise<Session> {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user) {
        session.user = {
          id: token.user._id,
          ...token.user, // Include any additional fields
        };
      }
      return session;
    },

    async jwt({ token, user }: { token: Token; user?: User }): Promise<Token> {
      if (user) {
        token.accessToken = user._id;
        token.user = {
          id: user._id,
          ...user,
        };
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "09123456789",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(
        credentials: Record<"phoneNumber" | "password", string> | undefined,
      ): Promise<User | null> {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { phoneNumber, password } = credentials;

        if (!phoneNumber || !password) {
          throw new Error("Please enter valid information");
        }

        const user = await db.users.findUnique({ where: { phoneNumber } });

        if (!user) {
          throw new Error("Please create an account first");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Incorrect email or password");
        }

        // Return the full user object that matches the User interface
        return {
          id: user.id,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
