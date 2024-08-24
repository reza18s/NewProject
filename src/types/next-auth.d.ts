// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    phoneNumber: string;
  }
  interface Session {
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
}
