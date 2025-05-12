import { cookies } from "next/headers";

export function getSession() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("session");

  if (!userSession) return null;

  try {
    return JSON.parse(userSession.value); // e.g., { userId, role, collegeId }
  } catch (e) {
    console.error("Invalid session cookie", e);
    return null;
  }
}
