// app/auth.ts
import NextAuth from "next-auth";
import Entra from "@auth/core/providers/microsoft-entra-id";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Entra({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            issuer: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0`,
            authorization: {
                params: {
                    prompt: "login",
                    scope: "openid profile email",
                },
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account && typeof account.access_token === "string") {
                token.accessToken = account.access_token;
                console.log("Access Token:", token.accessToken);
                token.expiresAt =
                    Date.now() + (account.expires_in ?? 0) * 1000;
            }
            return token;
        },

        async session({ session }) {
            return session; // 🔒 no access token exposed to browser
        },

        async authorized({ auth }) {
            // auth is Session | null
            return !!auth?.accessToken;
        },
    },
});

export const getAuthSession = async () => {
    return await auth();
};
