/**
 * App-wide constants.
 */

export const APP_NAME = "Yalla CPHQ";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  OFFERS: "/offers",
  CPHQ_REGISTER_1: "/offers/cphq-register-1",
  CPHQ_FREE_LECTURE: "/offers/cphq-free-lecture",
  CPHQ_OFFER: "/offers/cphq-offer",
} as const;

export const OFFERS_DROPDOWN_ITEMS = [
  { href: "/offers/cphq-register-1", label: "CPHQ Register 1" },
  { href: "/offers/cphq-free-lecture", label: "CPHQ Free Lecture" },
  { href: "/offers/cphq-offer", label: "CPHQ Offer" },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;
