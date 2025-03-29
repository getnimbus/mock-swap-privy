import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import NodeCache from "node-cache";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { ManipulateType } from "dayjs";
import Decimal from "decimal.js";
import numeral from "numeral";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export { dayjs };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const nodeCache = new NodeCache();

export function sqrtPriceX64ToPrice(
  sqrtPriceX64: Decimal,
  decimalsA: number,
  decimalsB: number,
): Decimal {
  return sqrtPriceX64
    .div(new Decimal(2).pow(64))
    .pow(2)
    .mul(Decimal.pow(10, decimalsA - decimalsB));
}

interface PriceData {
  timestamp: number;
  price: number;
}
export function findNearestPoint(
  timestamp: number,
  data: PriceData[],
): PriceData | null {
  let left: number = 0;
  let right: number = data.length - 1;
  let nearestPoint: PriceData | null = null;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    const midTimestamp: number = data[mid].timestamp;

    if (midTimestamp === timestamp) {
      return data[mid];
    }

    const diff: number = Math.abs(midTimestamp - timestamp);

    if (
      nearestPoint === null ||
      diff < Math.abs(nearestPoint.timestamp - timestamp)
    ) {
      nearestPoint = data[mid];
    }

    if (midTimestamp < timestamp) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return nearestPoint;
}

export const getDexScreenerPoolUrl = (mint: string) => {
  return `https://dexscreener.com/${"solana"}/${mint}`;
};

export const getExplorerUrl = (address: string, type: "account" | "tx") => {
  if (type === "account") {
    return `https://solscan.io/account/${address}`;
  }

  return `https://solscan.io/tx/${address}`;
};

export const shortenAddress = (address?: string | null) => {
  if (!address) return "";
  if (String(address).length <= 10) {
    return address;
  }
  return `${String(address).slice(0, 6)}...${String(address).slice(-4)}`;
};

export const COLORS = {
  // Ocean Blue Palette
  oceanBlue1: "#e6f3ff",
  oceanBlue2: "#bde3ff",
  oceanBlue3: "#94d3ff",
  oceanBlue4: "#6bc2ff",
  oceanBlue5: "#42b2ff",
  oceanBlue6: "#2c92ff", // Primary color
  oceanBlue7: "#2374cc",
  oceanBlue8: "#1a5799",
  oceanBlue9: "#113b66",
  oceanBlue10: "#081e33",

  // Existing colors
  red1: "#2a1215",
  red2: "#431418",
  red3: "#58181c",
  red4: "#791a1f",
  red5: "#a61d24",
  red6: "#d32029",
  red7: "#e84749",
  red8: "#f37370",
  red9: "#f89f9a",
  red10: "#fac8c3",
  white: "#fff",
  gray8: "#e8e8e8",
  gray9: "#434343",
  blue2: "#bae7ff",
  blue4: "#69c0ff",
  yellow5: "#E2B619",
  black1: "#141414",
  cyan1: "#e6fffb",
  cyan2: "#b5f5ec",
  cyan3: "#87e8de",
  cyan4: "#5cdbd3",
  cyan5: "#36cfc9",
  cyan6: "#13c2c2",
  cyan7: "#08979c",
  cyan8: "#006d75",
  cyan9: "#00474f",
  cyan10: "#002329",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
};

export const getPercentChange = (current: number, before: number) => {
  return Number(Number(((current - before) / before) * 100).toFixed(4));
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const tryCatch = async (fn: Function, defaultValue: any) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const cacheFn = async <T>(
  key: string,
  fn: Function,
  defaultValue: T,
): Promise<T> => {
  const cacheValue = nodeCache.get(key);
  if (cacheValue) {
    console.log("HIT ", key);
    return cacheValue as any as T;
  }

  const value = await tryCatch(fn, defaultValue);
  nodeCache.set(key, value, 5 * 60);
  return value;
};

export const timeChunk = (items: any[], chunk: number) => {
  if (!items.length) {
    return items;
  }

  const result = [];
  const sortedData = items.sort((a, b) => a.timestamp - b.timestamp);
  let startTime = sortedData[0].timestamp;
  while (startTime <= Date.now()) {
    const inRange = sortedData.filter(
      (item) =>
        item.timestamp >= startTime &&
        item.timestamp < dayjs(startTime).add(chunk, "hour").valueOf(),
    );
    result.push(inRange);
    startTime = dayjs(startTime).add(chunk, "hour").valueOf();
  }

  return result;
};

export function renameKey<
  T extends object,
  K extends keyof T,
  N extends string,
>(obj: T, oldProp: K, newProp: N): Omit<T, K> & { [P in N]: T[K] } {
  const { [oldProp]: oldValue, ...rest } = obj;
  return {
    ...rest,
    [newProp]: oldValue,
  } as Omit<T, K> & { [P in N]: T[K] };
}

export function cgFindNearestPoint(data: any[], timestamp: number) {
  let left: number = 0;
  let right: number = data.length - 1;
  let nearestPoint: any = null;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    const midTimestamp: number = data[mid][0];

    if (midTimestamp === timestamp) {
      return data[mid];
    }

    const diff: number = Math.abs(midTimestamp - timestamp);

    if (nearestPoint === null || diff < Math.abs(nearestPoint[0] - timestamp)) {
      nearestPoint = data[mid];
    }

    if (midTimestamp < timestamp) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return nearestPoint;
}

const normalizeTime = (
  timestamp: number,
  interval: number,
  isRoundUp: boolean,
) => {
  const dt = dayjs(Number(timestamp));
  const roundedMinute = isRoundUp
    ? Math.ceil(dt.minute() / interval) * interval
    : Math.floor(dt.minute() / interval) * interval;

  const roundedDt = dt.minute(roundedMinute).second(0);

  return Math.floor(roundedDt.valueOf() / 1000) * 1000;
};

export const TIME_RANGE = [
  {
    label: "1d",
    value: "1",
    interval: 5,
  },
  {
    label: "1w",
    value: "7",
    interval: 60,
  },
  {
    label: "1m",
    value: "30",
    interval: 60,
  },
  {
    label: "3m",
    value: "90",
    interval: 60,
  },
  {
    label: "1y",
    value: "365",
    interval: 60 * 24,
  },
];

export const TIME_RANGE_TO_TIME_FRAME: Record<string, string> = {
  "24_hours": "1d",
  "7_days": "7d",
  "30_days": "1m",
  "90_days": "3m",
  "1_year": "1y",
};

export const toPricePercentChanges = (
  data: Array<any>,
  interval: number,
): Array<(string | number)[]> => {
  if (!data?.length) {
    return [];
  }

  // normalize date
  const startTimeNormalize = normalizeTime(data[0][0], interval, false);
  const endTimeNormalize =
    roundTimestamp(
      data[data.length - 1][0],
      interval === 60 ? "hour" : "minute",
    ) * 1000;

  const normalizeData = [];
  let currentTime = startTimeNormalize;

  // we'll traversal from start time to end time with interval
  while (currentTime <= endTimeNormalize) {
    const nearestPoint = cgFindNearestPoint(data, currentTime);
    normalizeData.push([currentTime, nearestPoint[1]]);
    currentTime = dayjs(currentTime).add(interval, "minute").valueOf();
  }

  const initialPrice = normalizeData?.[0]?.[1];
  const result = normalizeData.map(([timestamp, price]) => {
    const percentageChange = ((price - initialPrice) / initialPrice) * 100;
    return [timestamp, percentageChange];
  });

  return result;
};

export const moneyFormat = (
  money: number,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(money);
};

const SUBSCRIPT_DIGITS: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "10": "₁₀",
  // I know it looks stupid, but it saves my time :)))
  "11": "₁₁",
  "12": "₁₂",
  "13": "₁₃",
  "14": "₁₄",
  "15": "₁₅",
  "16": "₁₆",
  "17": "₁₇",
  "18": "₁₈",
  "19": "₁₉",
};

export function formatNumber(
  number: number,
  { prefix = "", postfix = "", lessThanOneNumberFormat = "0.0000a" } = {},
) {
  if (number === undefined || number === null) return "";
  if (number === 0 || Math.abs(number) < Number.EPSILON)
    return `${prefix}0.00${postfix}`;

  // Handle negative numbers
  const isNegative = number < 0;
  const absNumber = Math.abs(number);
  const negativePrefix = isNegative ? "-" : "";

  if (absNumber >= 1) {
    return `${negativePrefix}${prefix}${numeral(absNumber).format(
      "0.00a",
    )}${postfix}`;
  }

  // Keep the existing small number formatting logic
  const decimalValue = absNumber.toFixed(20);
  const parts = decimalValue.split(".");

  // Return early if no decimal part
  if (!parts[1]) {
    return `${negativePrefix}${prefix}${numeral(absNumber).format(
      "0,0.00a",
    )}${postfix}`;
  }

  const leadingZeros = parts[1].match(/^0*/)?.[0].length;

  const subscriptZeroCount = leadingZeros
    ? SUBSCRIPT_DIGITS[leadingZeros.toString()]
    : "";

  const precision = lessThanOneNumberFormat.match(/\.(0*)/)?.[1]?.length || 4;

  const remainingDecimalPart = parts[1].slice(leadingZeros);
  const remainingDecimalPartNum = Number(`.${remainingDecimalPart}`)
    .toPrecision(precision)
    .split(".")[1];

  if (leadingZeros && leadingZeros >= precision)
    return `${negativePrefix}${prefix}0.0${subscriptZeroCount}${remainingDecimalPartNum}${postfix}`;

  return `${negativePrefix}${prefix}${numeral(absNumber).format(
    lessThanOneNumberFormat,
  )}${postfix}`;
}

export const formatPercent = (value: number) => {
  return numeral(value).format("0,0.00%");
};

export const autoFormatCurrency = (value: number, currency: string) => {
  if (currency === "USD") {
    return moneyFormat(value);
  }

  return formatNumber(value, { postfix: currency });
};

export const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export function calculateColor(value: number): string {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const red = Math.floor(((100 - clampedValue) * 255) / 100);
  const green = Math.floor((clampedValue * 255) / 100);
  const blue = 0;
  const color = `rgb(${red},${green},${blue})`;

  return color;
}

export function roundTimestamp(
  timestamp: number,
  unit: ManipulateType = "hour",
) {
  const date = dayjs(timestamp);

  if (unit === "hour") {
    const minutes = date.minute();
    if (minutes >= 30) {
      return date.add(1, "hour").startOf("hour").unix();
    } else {
      return date.startOf("hour").unix();
    }
  } else if (unit === "minute") {
    const minutes = date.minute();
    const roundedMinutes = Math.round(minutes / 5) * 5;
    return date.minute(roundedMinutes).second(0).unix();
  } else {
    throw new Error('Invalid unit. Please use "minute" or "hour".');
  }
}

export function getStartDate(
  btcPrices: number[][],
  ethPrices: number[][],
  categoryPrices: any,
  timeRange: string,
) {
  const minStartCatDate = Math.min(
    ...categoryPrices.map((arg: any) => arg[0][0]),
  );
  const startDate = Math.max(minStartCatDate, btcPrices[0][0], ethPrices[0][0]);

  const roundStartDate = roundTimestamp(
    startDate,
    timeRange === "1" ? "minute" : "hour",
  );

  // console.log({ roundStartDate });
  return roundStartDate;
}

export const formatRelativeTime = (
  target: dayjs.Dayjs,
  to?: dayjs.Dayjs,
): string => {
  const now = to || dayjs();

  const diffInMinutes = now.diff(target, "minute");
  const diffInHours = now.diff(target, "hour");

  // shining for recently opened position
  if (diffInMinutes < 60) {
    return `${diffInMinutes.toFixed(2)} minute${diffInMinutes <= 1 ? "" : "s"}`;
  }

  if (diffInHours < 24) {
    const hours = dayjs().diff(target, "hour", true);
    return `${hours.toFixed(2)} hour${hours <= 1 ? "" : "s"}`;
  }

  const days = dayjs().diff(target, "day", true);
  return `${days.toFixed(2)} day${days <= 1 ? "" : "s"}`;
};

export const LOWEST_TICK = -443636;
export const HIGHEST_TICK = 443636;

export const formatDuration = (date: string | Date | number): string => {
  const hours = dayjs().diff(dayjs(date), "hour", true);
  if (hours >= 24) {
    const days = (hours / 24).toFixed(2);
    return `${days} days`;
  }
  return `${hours.toFixed(2)}h`;
};
