import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    id: string;
    role?: Array<{
      id: string;
      arabicName: string;
      englishName: string;
    }>;
  }

  interface Session {
    user: {
      id: string;
      role?: Array<{
        id: string;
        arabicName: string;
        englishName: string;
      }>;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Array<{
      id: string;
      arabicName: string;
      englishName: string;
    }>;
  }
}
