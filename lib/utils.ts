import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    notation: "compact",
    maximumFractionDigits: value >= 10000 ? 0 : 1
  }).format(value);
}

/* Everything in the dataset is Ottawa-local. Plain YYYY-MM-DD values are
   calendar dates and must not be shifted by the viewer's timezone; ISO
   timestamps are pinned to the community's timezone so the demo reads the
   same wherever it is opened. */
const TIMEZONE = "America/Toronto";
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function toParts(value: string) {
  if (DATE_ONLY.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return { date: new Date(year, month - 1, day), timeZone: undefined };
  }
  return { date: new Date(value), timeZone: TIMEZONE };
}

export function formatDate(value: string) {
  const { date, timeZone } = toParts(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone
  }).format(date);
}

export function formatMonthYear(value: string) {
  const { date, timeZone } = toParts(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    year: "numeric",
    timeZone
  }).format(date);
}

export function formatDayParts(value: string) {
  const { date, timeZone } = toParts(value);
  if (Number.isNaN(date.getTime())) return { month: "", day: "" };
  return {
    month: new Intl.DateTimeFormat("en-CA", { month: "short", timeZone }).format(date),
    day: new Intl.DateTimeFormat("en-CA", { day: "numeric", timeZone }).format(date)
  };
}
