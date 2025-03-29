import { PublicKey } from "@solana/web3.js";

export const retryFn = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
): Promise<T> => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i)),
      ); // Exponential backoff
    }
  }
  throw lastError;
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const validateSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};
