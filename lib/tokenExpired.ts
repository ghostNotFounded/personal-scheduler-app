import { deleteCookie } from "./cookie";

export function CheckTokenExpiry() {
  const token = window.localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    deleteCookie();
    return Response.redirect("/login");
  }

  // Check if token is expired
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const payload = JSON.parse(atob(payloadEncoded));
  const expirationTime = payload?.exp * 1000;

  if (expirationTime && Date.now() >= expirationTime) {
    deleteCookie();
    return Response.redirect("/login");
  }

  return Response.redirect("/login");
}
