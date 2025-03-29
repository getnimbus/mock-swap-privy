export interface LinkedAccount {
  id: string | null;
  address: string;
  type: string;
  verifiedAt: string;
  firstVerifiedAt: string;
  latestVerifiedAt: string;
  chainType: string;
  walletClientType: string;
  connectorType: string;
  chainId?: string;
  hdWalletIndex?: number;
  imported?: boolean;
  delegated?: boolean;
}

export interface UserWallet {
  id: string | null;
  address: string;
  verifiedAt: string;
  firstVerifiedAt: string;
  latestVerifiedAt: string;
  chainType: string;
  walletClientType: string;
  connectorType: string;
}

export interface UserData {
  id: string;
  createdAt: string;
  isGuest: boolean;
  linkedAccounts: LinkedAccount[];
  wallet: UserWallet;
  settings: Settings;
}

export interface Settings {
  stopLoss: number;
  takeProfit: number;
  autoManage: boolean;
  baseToken: string;
  slippageBps: number;
  priorityLevel: number;
}

export interface TokenInfo {
  id: string;
  token_address: string;
  token_symbol: string;
  token_name: string;
  token_decimals: number;
  chain: string;
  logo: string | null;
  created_at: string;
  updated_at: string;
}

export interface PoolInfo {
  token0: TokenInfo;
  token1: TokenInfo;
}

export type Step = {
  step: "swapToken0" | "swapToken1" | "initializePosition";
} & (
  | {
      step: "swapToken0" | "swapToken1";
      neededToken: TokenAmount;
      openAmount: TokenAmount;
      symbol: string;
      name: string;
      logo: string;
    }
  | {
      step: "initializePosition";
      position: string;
    }
);

export type Bundle = {
  bundleId: string;
  signature: string;
};

export type PositionCreateResponse = {
  bundle: Bundle;
  steps: Step[];
  pool: {
    token0: {
      token_address: string;
      token_symbol: string;
      token_name: string;
      token_decimals: number;
      logo: string;
    };
    token1: {
      token_address: string;
      token_symbol: string;
      token_name: string;
      token_decimals: number;
      logo: string;
    };
  };
};

export interface SendOptions {
  skipPreflight?: boolean;
  preflightCommitment?: string;
  maxRetries?: number;
  minContextSlot?: number;
}

export type JitoRegion = "mainnet" | "devnet";

export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

export interface ClosePositionData {
  txID?: string;
  serializeTxn: any[];
}

export interface RiskAssessment {
  estimated_daily_return_pct: string;
  estimated_daily_return_pct_native: string;
  estimated_monthly_return_sol: string;
  protocol: string;
  pool_health: string;
  pool_score: number;
  token_score: number;
  user_score: number;
  total_score: number;
  risk_level: "Low" | "Medium" | "High";
  token0_symbol: string;
  token1_symbol: string;
  tvl: string;
  roi: string;
}

export interface TokenDisplay {
  symbol: string;
  name: string;
  logo: string;
  address: string;
}

export interface PositionSuggestion {
  id: string;
  poolId: string;
  poolName: string;
  riskAssessment: RiskAssessment;
  token0: TokenDisplay;
  token1: TokenDisplay;
  suggestedDeposit: string;
  suggestedDepositNative: string;
  apr: number;
  apy?: number;
  aprNative: number;
  tickUpper: string;
  tickLower: string;
  tvl: number;
  roi: number;
  riskLevel: "Low" | "Medium" | "High";
  address: string;
  platform: string;
  poolId: string;
}
