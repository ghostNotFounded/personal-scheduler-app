"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: "#0a0a0a",
          color: "#fff",
        },
      }}
    />
  );
};
