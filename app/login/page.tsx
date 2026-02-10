// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login with Entra</h1>
      <button
        onClick={() => signIn("sso")} // 'sso' is the name you used in Entra provider
        style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        Login
      </button>
    </div>
  );
}
