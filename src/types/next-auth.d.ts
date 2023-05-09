import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

type User = {
  id: string;
  email?: string | null;
  emailVerified?: Date | null;
  loginName?: string;
  image?: string | null;
  name?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: User;
    clientId?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    error?: string;
  }
}
