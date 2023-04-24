import NextAuth from "next-auth/next";
import KeycloadProvider from "next-auth/providers/keycloak";

export const authConfig = {
  providers: [
    KeycloadProvider({
      clientId: "nextjs",
      clientSecret: "FatNnru1PXQLPGfd87HDsDFLIoDoOFZw",
      issuer: "http://host.docker.internal:9000/realms/master"
    })
  ]
}

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
