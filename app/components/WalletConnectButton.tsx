"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

/**
 * WalletConnectButton
 * 
 * Renders the Solana Wallet Adapter multi-button which supports:
 * - X1 Wallet (auto-detected via Wallet Standard)
 * - Backpack (explicitly added)
 * - Any other Wallet Standard compliant wallet
 * 
 * Styled to match the DaisyUI/Tailwind design system.
 */
export function WalletConnectButton() {
  return (
    <WalletMultiButton
      style={{
        height: "2.5rem",
        fontSize: "0.875rem",
        borderRadius: "0.5rem",
      }}
    />
  );
}

export default WalletConnectButton;
