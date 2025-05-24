import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
// import { authConfig } from "@/lib/authConfig"; // optional, for cleaner config

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly'
                }
            }
        })
    ],
    session: {
        strategy: "database"
    },
    callbacks: {
        async session({ session, user }) {
            // Attach user id to session
            if (session?.user) {
                session.user.id = user.id;
                // Get the access token from the user's account
                const account = await prisma.account.findFirst({
                    where: { userId: user.id, provider: 'google' }
                });
                if (account) {
                    session.accessToken = account.access_token;
                }
            }
            return session;
        },
        async signIn({ account }) {
            if (account) {
                // Store the access token in the database
                await prisma.account.update({
                    where: { id: account.id },
                    data: {
                        access_token: account.access_token,
                        refresh_token: account.refresh_token,
                        expires_at: account.expires_at
                    }
                });
            }
            return true;
        }
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
