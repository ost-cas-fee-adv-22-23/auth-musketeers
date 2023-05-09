import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import logger from "@/services/logger";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  logger.info({ session: session }, "index.tsx session");

  return (
    <>
      {!session && (
        <>
          <p>Not signed in</p>
          <br />

          <button
            onClick={() =>
              signIn("zitadel", {
                callbackUrl: "http://localhost:3000/",
              })
            }
          >
            Sign in
          </button>
        </>
      )}
      {loading && <span>loading...</span>}
      {session && (
        <>
          <p>
            Signed in as {session.user?.loginName} {session.user?.email}
          </p>
          <button onClick={() => signOut()}>Sign out</button>

          <h3 className="mt-10">session</h3>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
      )}
    </>
  );
}
