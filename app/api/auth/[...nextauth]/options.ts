import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Username",
        },
        email: { label: "Email:", type: "text", placeholder: "Your Email" },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }
        const passwordMatched = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordMatched) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
