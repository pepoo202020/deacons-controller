import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type RoleDTO = {
  id: string;
  arabicName: string;
  englishName: string;
};

export const dynamic = "force-dynamic";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim() ?? "";
        const password = credentials?.password ?? "";
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            isActive: true,
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    arabicName: true,
                    englishName: true,
                  },
                },
              },
            },
          },
        });
        if (!user || !user.password || !user.isActive) return null;
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        const roles: RoleDTO[] = user.roles
          .map((r) => r.role)
          .filter(Boolean) as RoleDTO[];
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: roles,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: RoleDTO[] }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token as { role?: RoleDTO[] }).role; // Role في الـ session
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth", // Custom login page
  },
});
export { handler as GET, handler as POST };
