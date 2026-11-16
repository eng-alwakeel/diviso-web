// Run: node --test supabase/functions/delete-account/delete_account_test.ts
// (or deno test). Pure flow tests — no network, no database.
import { test } from "node:test";
import assert from "node:assert/strict";
import { deleteAccountFlow, type PrepareResult } from "./flow.ts";

const ok = (r: PrepareResult) => async () => ({ data: r, error: null });

test("hard: prepare ok → hard auth delete → 200 with counts", async () => {
  const calls: Array<[string, boolean]> = [];
  const res = await deleteAccountFlow("u1", ok({ mode: "hard", transferred_groups: 2, deleted_groups: 1 }),
    async (id, soft) => { calls.push([id, soft]); return { error: null }; });
  assert.equal(res.status, 200);
  assert.deepEqual(calls, [["u1", false]]);
  assert.equal(res.body.transferred_groups, 2);
  assert.equal(res.body.deleted_groups, 1);
});

test("soft: shared money records → soft auth delete", async () => {
  const calls: Array<[string, boolean]> = [];
  const res = await deleteAccountFlow("u1", ok({ mode: "soft", transferred_groups: 0, deleted_groups: 0 }),
    async (id, soft) => { calls.push([id, soft]); return { error: null }; });
  assert.equal(res.status, 200);
  assert.deepEqual(calls, [["u1", true]]);
  assert.equal(res.body.mode, "soft");
});

test("prepare fails → 500 prepare_failed, auth user never touched", async () => {
  let touched = false;
  const res = await deleteAccountFlow("u1", async () => ({ data: null, error: { message: "boom" } }),
    async () => { touched = true; return { error: null }; });
  assert.equal(res.status, 500);
  assert.equal(res.body.error, "prepare_failed");
  assert.equal(touched, false);
});

test("auth delete fails → 500 auth_delete_failed (safe to retry)", async () => {
  const res = await deleteAccountFlow("u1", ok({ mode: "hard", transferred_groups: 0, deleted_groups: 0 }),
    async () => ({ error: { message: "nope" } }));
  assert.equal(res.status, 500);
  assert.equal(res.body.error, "auth_delete_failed");
});
