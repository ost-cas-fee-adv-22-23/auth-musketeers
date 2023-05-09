import { useState, useEffect } from "react";

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
    <div>
      {Object.keys(data).map((key, i) => (
        <p key={i}>
          <span className="mr-2">{key}:</span>
          <span>{data[key]}</span>
        </p>
      ))}
    </div>
  );
}
