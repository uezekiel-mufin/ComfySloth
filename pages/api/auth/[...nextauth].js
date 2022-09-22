import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import db from "../../../utils/db";
import User from "../../../components/Models/User";
import bcryptjs from "bcryptjs";
// import clientPromise from "../../../components/connectMongDb";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  // your configs
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "",
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email and password");
      },
    }),
  ],
};

export default NextAuth(authOptions);
