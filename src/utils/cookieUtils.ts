"use client";

import Cookies from "js-cookie";

export type CookieOptions = Cookies.CookieAttributes;

/**
 * Default cookie options
 */
const defaultOptions: CookieOptions = {
  path: "/",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

/**
 * Set a cookie (Client-side only)
 * @param name - Name of the cookie
 * @param value - Value to store
 * @param options - Optional cookie attributes
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  Cookies.set(name, value, { ...defaultOptions, ...options });
};

/**
 * Get a cookie
 * @param name - Name of the cookie
 * @returns Value of the cookie or undefined
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie (Client-side only)
 * @param name - Name of the cookie
 * @param options - Optional cookie attributes
 */
export const removeCookie = (
  name: string,
  options: CookieOptions = {},
): void => {
  Cookies.remove(name, { ...defaultOptions, ...options });
};
