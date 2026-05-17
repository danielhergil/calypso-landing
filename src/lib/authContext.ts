import { auth } from "../firebase";

export type ClientAuthContext = {
  uid: string;
  idToken: string;
};

const UID_KEY = "calypso_uid";
const TOKEN_KEY = "calypso_id_token";

const readFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");
  const idToken = params.get("idToken");

  if (uid && idToken) {
    localStorage.setItem(UID_KEY, uid);
    localStorage.setItem(TOKEN_KEY, idToken);

    const next = `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, "", next);
    return { uid, idToken };
  }

  return null;
};

export const setClientAuthContext = (ctx: ClientAuthContext) => {
  localStorage.setItem(UID_KEY, ctx.uid);
  localStorage.setItem(TOKEN_KEY, ctx.idToken);
};

export const clearClientAuthContext = () => {
  localStorage.removeItem(UID_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const getClientAuthContext = (): ClientAuthContext | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const fromQuery = readFromQuery();
  if (fromQuery) {
    return fromQuery;
  }

  const uid = localStorage.getItem(UID_KEY) ?? import.meta.env.VITE_CALYPSO_UID;
  const idToken = localStorage.getItem(TOKEN_KEY) ?? import.meta.env.VITE_CALYPSO_ID_TOKEN;

  if (!uid || !idToken) {
    return null;
  }

  return { uid, idToken };
};

export const getFreshClientAuthContext = async (): Promise<ClientAuthContext | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const fromQuery = readFromQuery();
  if (fromQuery) {
    return fromQuery;
  }

  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    const ctx = { uid: user.uid, idToken };
    setClientAuthContext(ctx);
    return ctx;
  }

  return getClientAuthContext();
};
