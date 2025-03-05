"use client";

import { useEffect, useState } from "react";

export default function BackendTask2() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/readfile")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h1>Backend - ข้อ 2 (อ่านไฟล์)</h1><br/>
      {loading ? <p>Loading...</p> : (
        <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.number}</td>
                <td>{item.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}
