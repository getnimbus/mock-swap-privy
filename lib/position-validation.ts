import { TokenBalance } from "@/api/lp";
import { formatCurrency } from "./number";

export const TX_FEE = 1_000_000 / 10 ** 9 + 500_000 / 10 ** 9; // same with max jito tip and a little buffer
export const RENT_AMOUNT = 50_000_000 / 10 ** 9;

export interface BalanceValidationResult {
  hasError: boolean;
  errorMessage?: string;
}

export function validateSolBalance({
  parsedAmount,
  userSolBalance,
  nativePrice,
  isUsdMode = true,
  isIncrease = false,
}: {
  parsedAmount: number;
  userSolBalance: TokenBalance;
  nativePrice: number | null;
  isUsdMode?: boolean;
  isIncrease?: boolean;
}): BalanceValidationResult {
  if (!userSolBalance || !nativePrice) {
    return { hasError: true };
  }

  // Convert amounts to SOL for validation
  const solBalance = Number(userSolBalance.balance || 0);
  const parsedAmountInSol = isUsdMode
    ? parsedAmount / nativePrice
    : parsedAmount;
  const remainingSol = solBalance - parsedAmountInSol;

  const MIN_SOL_REQUIREMENT = isIncrease ? TX_FEE : TX_FEE + RENT_AMOUNT;

  if (remainingSol < MIN_SOL_REQUIREMENT) {
    if (isUsdMode) {
      return {
        hasError: true,
        errorMessage: `Please keep at least ${formatCurrency(
          MIN_SOL_REQUIREMENT * nativePrice,
        )} in your wallet (${
          !isIncrease
            ? `${RENT_AMOUNT} SOL for position rent which will be refunded, and extra `
            : ""
        }for transaction fees)`,
      };
    }

    return {
      hasError: true,
      errorMessage: `Please keep at least ${MIN_SOL_REQUIREMENT} SOL in your wallet (${
        !isIncrease
          ? `${RENT_AMOUNT} SOL for position rent which will be refunded, and extra `
          : ""
      }for transaction fees)`,
    };
  }

  return { hasError: false };
}
