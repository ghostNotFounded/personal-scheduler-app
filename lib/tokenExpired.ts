import { redirect } from "next/navigation";
import { deleteCookie } from "./cookie";

export const checkTokenExpiry = () => {
  const token = window.localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    deleteCookie();
    redirect("/login");
  }

  // Check if token is expired
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const payload = JSON.parse(atob(payloadEncoded));
  const expirationTime = payload?.exp * 1000;

  if (expirationTime && Date.now() >= expirationTime) {
    deleteCookie();
    redirect("/login");
  }
};
