import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/userinfo")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="h-auto text-center border border-1 p-5">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Demo Profile Page
      </h1>
      <div className="bg-gray-900 p-5 mt-10 mb-10 text-left">
        <pre>
          Profile data:
          {Object.keys(data).map((key, i) => (
            <p key={i}>
              <span className="mr-2">{key}:</span>
              <span>{data[key]}</span>
            </p>
          ))}
        </pre>
      </div>
      <div>
        <Link href="/" className="border border-1 p-2 mt-10">
          Goto Index Page
        </Link>
      </div>
    </div>
  );
}
