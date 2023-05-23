import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import logger from "@/services/logger";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  logger.info({ session: session }, "index.tsx session");

  return (
    <div className="h-auto text-center border border-1 p-5">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Musketeer&apos;s Auth Sandbox App
      </h1>
      {!session && !loading && (
        <>
          <p>Not signed in</p>
          <br />

          <button
            onClick={() =>
              signIn("zitadel", {
                callbackUrl: "http://localhost:3000/",
              })
            }
            className="border border-1 p-2"
          >
            Sign in
          </button>
        </>
      )}
      {loading && <span>loading...</span>}
      {session && (
        <>
          <div className="">
            <p className="text-center">
              Signed in as {session.user?.loginName} {session.user?.email}{" "}
              <br />
              <Image
                src={session.user?.image ?? ""}
                alt="Profile picture"
                width={100}
                height={100}
                className="mt-5 mb-5 w-auto h-auto inline-block"
              />
            </p>
            <button onClick={() => signOut()} className="border border-1 p-2">
              Sign out
            </button>

            <div className="bg-gray-900 p-5 mt-10 mb-10">
              <h3>Debug Info (Please also open the console)</h3>
              <pre className="text-left w-50">
                session:
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
          <div>
            <Link href="/profile" className="border border-1 p-2 mt-10">
              Goto Profile Page
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
