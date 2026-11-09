"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function onClick() {
    await fetch("/api/ops/logout", { method: "POST" });
    router.push("/ops/login");
    router.refresh();
  }

  return (
    <button className="me-btn me-btn--ghost" type="button" onClick={onClick}>
      Log out
    </button>
  );
}
