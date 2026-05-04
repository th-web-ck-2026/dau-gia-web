import Cookies from "js-cookie";

export const cookies = {
  set: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, { path: "/", ...options });
  },
  get: (name: string) => {
    return Cookies.get(name);
  },
  remove: (name: string) => {
    Cookies.remove(name, { path: "/" });
    Cookies.remove(name);
  },
};
