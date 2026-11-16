// Pure flow for delete-account (no imports) — see index.ts.

export type PrepareResult = {
  mode: "hard" | "soft";
  transferred_groups: number;
  deleted_groups: number;
};

/// The whole flow with its two side effects injected (tested in
/// delete_account_test.ts without a network).
export async function deleteAccountFlow(
  userId: string,
  prepare: (id: string) => Promise<{ data: PrepareResult | null; error: { message: string } | null }>,
  deleteAuthUser: (id: string, soft: boolean) => Promise<{ error: { message: string } | null }>,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const { data, error } = await prepare(userId);
  if (error || !data) {
    return {
      status: 500,
      body: { error: "prepare_failed", message: "Nothing was deleted. Please try again later." },
    };
  }
  const { error: authError } = await deleteAuthUser(userId, data.mode === "soft");
  if (authError) {
    return {
      status: 500,
      body: {
        error: "auth_delete_failed",
        message: "Your data was removed but the sign-in could not be closed. Please try again.",
        mode: data.mode,
      },
    };
  }
  return {
    status: 200,
    body: { message: "Account deleted successfully", ...data },
  };
}
