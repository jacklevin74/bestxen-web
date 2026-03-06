"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-backpack";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

/**
 * X1WalletAdapter - detects the X1 Wallet browser extension.
 * X1 Wallet injects window.x1 and also window.solana (like Phantom),
 * so we use a StandardWalletAdapter-compatible detection approach.
 * Since @solana/wallet-adapter-wallets v0.19 includes all Standard wallets
 * automatically, X1 Wallet (which supports the Wallet Standard) will be
 * auto-detected. We just need to explicitly include Backpack here.
 */

interface BestXenWalletProviderProps {
  children: ReactNode;
}

export const BestXenWalletProvider: FC<BestXenWalletProviderProps> = ({
  children,
}) => {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ||
    "https://rpc.mainnet.x1.xyz";

  /**
   * Wallets list:
   * - BackpackWalletAdapter: explicitly added for Backpack support
   * - X1 Wallet: auto-detected via Wallet Standard (injected as window.x1
   *   and registers itself with the standard wallet registry)
   * Additional wallets from @solana/wallet-adapter-wallets are auto-detected
   * via the Wallet Standard as well (Phantom, Solflare, etc.)
   */
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default BestXenWalletProvider;
