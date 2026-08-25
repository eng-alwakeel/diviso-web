import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

interface AuthorizationDetails {
  client?: { name?: string; client_name?: string; client_uri?: string; logo_uri?: string };
  client_name?: string;
  scope?: string;
  scopes?: string[];
  redirect_uri?: string;
}

/**
 * OAuth consent screen for the app's MCP server.
 * Supabase's OAuth 2.1 authorization server redirects here with
 * `?authorization_id=...`; we approve or deny on the user's behalf.
 */
const OAuthConsent = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");

  const authorizationId = useMemo(
    () => new URLSearchParams(window.location.search).get("authorization_id"),
    [],
  );

  const [token, setToken] = useState<string | null>(null);
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<"approve" | "deny" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Require a signed-in Diviso user, then load the pending authorization.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;

      if (!accessToken) {
        const back = `${window.location.pathname}${window.location.search}`;
        window.location.replace(`/auth?redirectTo=${encodeURIComponent(back)}`);
        return;
      }
      if (cancelled) return;
      setToken(accessToken);

      if (!authorizationId) {
        setError(isAr ? "طلب غير صالح: لا يوجد معرف تفويض." : "Invalid request: missing authorization id.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${SUPABASE_URL}/auth/v1/oauth/authorizations/${authorizationId}`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${accessToken}` } },
        );
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(body?.msg || body?.error_description || `HTTP ${res.status}`);
        if (!cancelled) setDetails(body);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authorizationId, isAr]);

  const decide = async (action: "approve" | "deny") => {
    if (!authorizationId || !token) return;
    setSubmitting(action);
    setError(null);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/oauth/authorizations/${authorizationId}/consent`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.msg || body?.error_description || `HTTP ${res.status}`);

      const redirectUrl = body?.redirect_url || body?.redirect_uri;
      if (redirectUrl) {
        window.location.replace(redirectUrl);
        return;
      }
      setError(isAr ? "لم يتم استلام رابط العودة." : "No redirect URL was returned.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(null);
    }
  };

  const clientName =
    details?.client?.client_name || details?.client?.name || details?.client_name ||
    (isAr ? "تطبيق خارجي" : "An external app");

  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(" ").filter(Boolean) : []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center space-y-2">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <CardTitle className="text-xl">
            {isAr ? "طلب الوصول إلى حسابك" : "Authorize access"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center">
                {isAr
                  ? `يطلب «${clientName}» الوصول إلى بيانات Diviso الخاصة بك (المجموعات، المصاريف، الأرصدة والتسويات) نيابةً عنك.`
                  : `${clientName} wants to access your Diviso data (groups, expenses, balances and settlements) on your behalf.`}
              </p>

              {scopes.length > 0 && (
                <ul className="rounded-lg border border-border bg-muted/30 p-3 space-y-1 text-xs text-muted-foreground">
                  {scopes.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              )}

              {error && (
                <p className="text-sm text-destructive text-center" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => decide("approve")}
                  disabled={!!submitting || !authorizationId}
                  size="lg"
                >
                  {submitting === "approve" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isAr ? "السماح بالوصول" : "Allow access"}
                </Button>
                <Button
                  onClick={() => decide("deny")}
                  variant="ghost"
                  disabled={!!submitting || !authorizationId}
                >
                  {isAr ? "رفض" : "Deny"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default OAuthConsent;
