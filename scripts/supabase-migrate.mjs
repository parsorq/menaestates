#!/usr/bin/env node
/**
 * Link (if needed) and push migrations to the remote Supabase project.
 * Loads .env.local. Requires supabase CLI + access token (keychain / SUPABASE_ACCESS_TOKEN).
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");
const projectRef = "qsijhuqxtvdxznbzwmkn";

function loadEnvLocal() {
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i);
    let val = trimmed.slice(i + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function run(args, opts = {}) {
  const res = spawnSync("supabase", args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
    ...opts,
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

loadEnvLocal();

const dbPassFile = resolve(root, ".supabase_db_password");
const dbPass = existsSync(dbPassFile)
  ? readFileSync(dbPassFile, "utf8").trim()
  : process.env.SUPABASE_DB_PASSWORD || "";

run(["link", "--project-ref", projectRef, "--yes"]);
const pushArgs = ["db", "push", "--yes", "--remote"];
if (dbPass) pushArgs.push("--password", dbPass);
run(pushArgs);
console.log("Migrations pushed to", projectRef);
