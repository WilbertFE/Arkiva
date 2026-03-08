import { getUserByEmail } from "@/lib/db";
import supabase from "@/lib/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const Schemas = z.object({
  email: z
    .email("Email tidak valid.")
    .trim()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Password wajib diisi."),
});

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          console.error("Credentials not provided");
          return null;
        }

        const parsed = Schemas.safeParse(credentials);

        if (!parsed.success) {
          console.error("Invalid credentials format");
          return null;
        }

        const email = parsed.data.email;
        const password = parsed.data.password;

        const { data: dbUser, error } = await supabase
          .from("users")
          .select("uuid, password, username, email, role, full_name, school, class, avatar_url, created_at, updated_at")
          .eq("email", email)
          .maybeSingle();

        if (error || !dbUser) {
          console.error("Invalid credentials");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (isPasswordValid) {
          return {
            id: dbUser.uuid,
            username: dbUser.username,
            email: dbUser.email,
            role: dbUser.role,
            full_name: dbUser.full_name,
            school: dbUser.school,
            class: dbUser.class,
            avatar_url: dbUser.avatar_url,
            created_at: dbUser.created_at,
            updated_at: dbUser.updated_at
          };
        } else {
          console.error("Invalid credentials");
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "google") {
        const email = user.email?.toLowerCase();

        if (!email) return false;

        const { data: existingUser } = await getUserByEmail(email);

        if (existingUser) {
          user.id = existingUser.id;
          user.role = existingUser.role;
          user.username = existingUser.username;
          user.full_name = existingUser.full_name;
          user.email = existingUser.email;
          user.school = existingUser.school;
          user.class = existingUser.class;
          user.avatar_url = existingUser.avatar_url;
          user.created_at = existingUser.created_at;
          user.updated_at = existingUser.updated_at;
        } else {
          // sign up
          const uuid = uuidv4();
          const newUser = {
            username: `user-${uuid}`,
            full_name: user.name,
            password: null,
            email,
            role: "user",
            type: "google",
            uuid,
            email_verified: new Date(),
          };
          const { error, data: newUserData } = await supabase
            .from("users")
            .insert(newUser)
            .select()
            .single();

          if (error) {
            console.error(error);
            return false;
          }
          user.id = newUserData.uuid;
          user.role = newUserData.role;
          user.username = newUserData.username;
          user.full_name = newUserData.full_name;
          user.email = newUserData.email;
          user.school = newUserData.school;
          user.class = newUserData.class;
          user.avatar_url = newUserData.avatar_url;
          user.created_at = newUserData.created_at;
          user.updated_at = newUserData.updated_at;
        }

        return true;
      }

      if (account?.provider === "credentials") {
        const { data: existingUser } = await supabase
          .from("users")
          .select("email_verified")
          .eq("email", user.email)
          .maybeSingle();

        if (!existingUser?.email_verified) {
          return false;
        }

        return true;
      }
      return false;
    },

    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.full_name = user.full_name;
        token.school = user.school;
        token.class = user.class;
        token.avatar_url = user.avatar_url;
        token.created_at = user.created_at;
        token.updated_at = user.updated_at;
      }

      // Handle session updates (client-side update() call)
      if (trigger === "update" && session?.user?.email) {
        const { data: freshUser } = await getUserByEmail(session.user.email);
        if (freshUser) {
          token.full_name = freshUser.full_name;
          token.username = freshUser.username;
          token.school = freshUser.school;
          token.class = freshUser.class;
          token.avatar_url = freshUser.avatar_url;
          token.updated_at = freshUser.updated_at;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.created_at = token.created_at;
        session.user.updated_at = token.updated_at;
        session.user.email = token.email;
        session.user.full_name = token.full_name;
        session.user.school = token.school;
        session.user.class = token.class;
        session.user.avatar_url = token.avatar_url;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
