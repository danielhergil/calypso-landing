import type { ClientAuthContext } from "./authContext";

export type BillingPlan = "pro" | "max";

export type BillingMe = {
  accountType: "basic" | "pro" | "max";
  subscriptionStatus: string | null;
  subscriptionCurrentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean | null;
};

type BillingMeRaw = {
  accountType?: "basic" | "pro" | "max";
  subscriptionStatus?: string | null;
  subscriptionCurrentPeriodEnd?: unknown;
  cancelAtPeriodEnd?: boolean | null;
};

const billingBaseUrl = import.meta.env.VITE_BILLING_API_BASE_URL;

const fetchWithAuth = async <T>(
  path: string,
  auth: ClientAuthContext,
  init?: RequestInit
): Promise<T> => {
  if (!billingBaseUrl) {
    throw new Error("Missing VITE_BILLING_API_BASE_URL");
  }

  const response = await fetch(`${billingBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.idToken}`,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Billing API ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
};

export const createCheckoutSession = async (auth: ClientAuthContext, plan: BillingPlan) => {
  return fetchWithAuth<{ url: string }>("/v1/billing/checkout-session", auth, {
    method: "POST",
    body: JSON.stringify({ plan })
  });
};

export const createPortalSession = async (auth: ClientAuthContext) => {
  return fetchWithAuth<{ url: string }>("/v1/billing/portal-session", auth, {
    method: "POST"
  });
};

export const fetchBillingMe = async (auth: ClientAuthContext) => {
  const raw = await fetchWithAuth<BillingMeRaw>("/v1/billing/me", auth, {
    method: "GET"
  });

  const normalizeDate = (value: unknown): string | null => {
    if (!value) {
      return null;
    }

    if (typeof value === "string") {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    }

    if (typeof value === "number") {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    }

    if (typeof value === "object") {
      const maybe = value as { _seconds?: unknown; seconds?: unknown; toDate?: () => Date };
      if (typeof maybe.toDate === "function") {
        const d = maybe.toDate();
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      }

      const seconds = typeof maybe._seconds === "number"
        ? maybe._seconds
        : (typeof maybe.seconds === "number" ? maybe.seconds : null);
      if (seconds !== null) {
        const d = new Date(seconds * 1000);
        return Number.isNaN(d.getTime()) ? null : d.toISOString();
      }
    }

    return null;
  };

  return {
    accountType: raw.accountType ?? "basic",
    subscriptionStatus: raw.subscriptionStatus ?? null,
    subscriptionCurrentPeriodEnd: normalizeDate(raw.subscriptionCurrentPeriodEnd),
    cancelAtPeriodEnd: raw.cancelAtPeriodEnd ?? null
  } satisfies BillingMe;
};
