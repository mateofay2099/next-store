"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div
      style={{
        padding: "10rem",
      }}
    >
      <h1>An error has occurred</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
