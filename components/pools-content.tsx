"use client";

import { useSendTransaction } from "@privy-io/react-auth/solana";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import { agentApi } from "@/api/agent";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLogin, usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import DelegateBtn from "./delegate-btn";
import { Logout } from "./logout";

const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com",
  {
    wsEndpoint: process.env.NEXT_PUBLIC_SOLANA_WS_URL,
  },
);

const sendMessage = async (agent: string, message: string, metadata?: any) => {
  const { data } = await agentApi.post(`/v1/chat/${agent}`, {
    roomId: undefined,
    message,
    metadata,
  });
  return data?.data;
};

const handleSubmitMsg = async (input: string) => {
  const response = await sendMessage("lpagent", input, undefined);
  return response;
};

export default function PoolsContent() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { logout, authenticated, user } = usePrivy();
  const { sendTransaction } = useSendTransaction();

  const delegatedWallet: any = user?.linkedAccounts?.find(
    (account) => account.type === "wallet" && !!account.delegated,
  );

  const { login } = useLogin({
    onComplete({ isNewUser }: { isNewUser: boolean }) {},
    onError(error) {
      logout();
    },
  });

  const { mutate: submitMsgMutation, isPending } = useMutation({
    mutationFn: (input: string) => handleSubmitMsg(input),
    onSuccess: (data: any) => {
      const listResponseMsg = data.message.map((msg: any) => {
        return {
          text: msg.text,
          isUser: false,
          showCard: msg.action,
          isNewMessage: true,
          data: msg.data,
          metadata: msg?.metadata,
        };
      });
      setMessages(listResponseMsg);
    },
    onError: () => {},
  });

  const handleSubmit = async () => {
    submitMsgMutation(
      "swap 0.1 SOL to EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    );
  };

  const onSubmitTrx = async (tx: string) => {
    try {
      setIsLoading(true);

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const transactionBuffer = Buffer.from(tx, "base64");

      let transaction;

      try {
        transaction = VersionedTransaction.deserialize(transactionBuffer);
      } catch (e) {
        transaction = Transaction.from(transactionBuffer);
        console.error("Failed to deserialize versioned transaction:", e);
      }

      const txReceipt = await sendTransaction({
        transaction,
        connection,
        transactionOptions: {
          maxRetries: 2,
          skipPreflight: true,
        },
      });

      const confirmation = await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature: txReceipt.signature,
        },
        "confirmed",
      );

      if (confirmation.value.err) {
        throw new Error(
          `Transaction failed: ${JSON.stringify(confirmation.value.err)}`,
        );
      }
    } catch (e) {
      console.error("Failed to send swap transaction:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messages && messages.length > 0) {
      const tx = messages[messages.length - 1]?.data?.tx;
      onSubmitTrx(tx);
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      {delegatedWallet && (
        <div className="text-white text-sm">
          Embedded Wallet: {delegatedWallet?.address}
        </div>
      )}

      {delegatedWallet && authenticated ? (
        <Button
          className="text-white focus:ring-green-500 px-2"
          size="action"
          onClick={handleSubmit}
          disabled={isLoading || isPending}
        >
          {isLoading ||
            (isPending && <Loader2 className="mr-3 h-4 w-4 animate-spin" />)}
          {isLoading || isPending ? "Loading..." : "Swap 0.1 SOL to USDC"}
        </Button>
      ) : (
        <>
          {!authenticated ? (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setMessages([]);
                login();
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <DelegateBtn
              addressTitle={
                delegatedWallet?.address || user?.wallet?.address || ""
              }
              onClose={() => {}}
            />
          )}
        </>
      )}

      {authenticated && <Logout />}
    </div>
  );
}
