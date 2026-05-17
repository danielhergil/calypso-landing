import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { BillingMe, BillingPlan } from "./billingApi";

const ignorePermissionError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  if (message.toLowerCase().includes("missing or insufficient permissions")) {
    console.warn("Firestore client billing write skipped by rules:", message);
    return;
  }
  throw error;
};

export const writeCheckoutAttempt = async (uid: string, plan: BillingPlan) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        billingClient: {
          pendingPlan: plan,
          checkoutRequestedAt: serverTimestamp(),
          source: "landing"
        }
      },
      { merge: true }
    );
  } catch (error) {
    ignorePermissionError(error);
  }

  try {
    await addDoc(collection(db, "users", uid, "subscription_events_client"), {
      type: "checkout_requested",
      plan,
      source: "landing",
      createdAt: serverTimestamp()
    });
  } catch (error) {
    ignorePermissionError(error);
  }
};

export const writeCheckoutError = async (uid: string, plan: BillingPlan, reason: string) => {
  try {
    await addDoc(collection(db, "users", uid, "subscription_events_client"), {
      type: "checkout_error",
      plan,
      reason,
      source: "landing",
      createdAt: serverTimestamp()
    });
  } catch (error) {
    ignorePermissionError(error);
  }
};

export const writeBillingSnapshot = async (uid: string, billing: BillingMe, source: string) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        billingClient: {
          lastSource: source,
          lastRefreshAt: serverTimestamp(),
          accountType: billing.accountType,
          subscriptionStatus: billing.subscriptionStatus,
          subscriptionCurrentPeriodEnd: billing.subscriptionCurrentPeriodEnd,
          cancelAtPeriodEnd: billing.cancelAtPeriodEnd
        }
      },
      { merge: true }
    );
  } catch (error) {
    ignorePermissionError(error);
  }

  try {
    await addDoc(collection(db, "users", uid, "subscription_events_client"), {
      type: "billing_snapshot",
      source,
      accountType: billing.accountType,
      subscriptionStatus: billing.subscriptionStatus,
      subscriptionCurrentPeriodEnd: billing.subscriptionCurrentPeriodEnd,
      cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    ignorePermissionError(error);
  }
};
