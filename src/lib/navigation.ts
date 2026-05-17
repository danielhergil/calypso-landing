export const navigateTo = (path: string) => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }

  window.dispatchEvent(new Event("app:navigate"));
};

