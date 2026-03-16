# bestXEN Web — Changes from SolXEN

Forked from: https://github.com/FairCrypto/sol-xen-app

## What Changed

### Program IDs (X1 Mainnet)
| Role | Program ID |
|------|-----------|
| bestxen_miner0 | `9jwmN4omMxC9r9Wa2YbYhVpt9qxHVzprC6ZR11KuE4GU` |
| bestxen_miner1 | `6VAdRXDe24nDdkaBJmpws51bhUWkp8Y4QPKKPKbZMchE` |
| bestxen_miner2 | `GvVx5YyjrYwNpkGDFyjvKwdvPCny2zWzWUaK3T3c4zQD` |
| bestxen_miner3 | `6pR9MXWVEkRLqVBtg9FV4NYPuzjMGNHu8ukvjpzoq5G2` |
| bestxen_minter | `7gxpAbAbiVRefs2QPKzcXEDo2yPUjrXqPMeb4CufaL6f` |

### RPC Endpoint
- Changed from Solana mainnet → X1 mainnet: `https://rpc.mainnet.x1.xyz`
- WebSocket: `wss://rpc.mainnet.x1.xyz`

### Wallet Support
- Added `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui`, `@solana/wallet-adapter-wallets`, `@solana/wallet-adapter-backpack`
- Created `app/context/WalletProvider.tsx` — ConnectionProvider + WalletProvider wrapping the full app
- Created `app/components/WalletConnectButton.tsx` — WalletMultiButton with dynamic SSR-safe import
- **X1 Wallet** auto-detected via Wallet Standard (injected as `window.x1`, registers with the standard wallet registry)
- **Backpack** explicitly added via `BackpackWalletAdapter`
- Wallet button added to NavBar

### Branding
- `solXEN` → `bestXEN` throughout UI
- Title: "bestXEN Leaderboard"
- Hero: "PROOF OF WORK MINING ON X1"
- Footer: "bestXEN on X1"
- NavBar: text logo "bestXEN" (replaced image logo)
- Removed Google Analytics tag

### Files Modified
- `app/layout.tsx` — title, wallet provider
- `app/page.tsx` — full rebrand, X1 copy
- `app/components/NavBar.tsx` — bestXEN text logo, wallet button, X1 links
- `app/components/Footer.tsx` — bestXEN branding
- `app/hooks/SolanaEventsHook.tsx` — X1 RPC, hardcoded program ID fallback
- `app/leaderboard/LeadersTable.tsx` — bestXEN label
- `app/leaderboard/StateStats.tsx` — bestXEN labels
- `app/leaderboard/[slug]/AccountCharts.tsx` — bestXEN labels
- `app/leaderboard/[slug]/AccountStats.tsx` — bestXEN labels
- `app/leaderboard/target/idl/sol_xen.json` — minter address updated
- `app/leaderboard/target/types/sol_xen.ts` — minter address updated
- `.env.local` — X1 RPC + program IDs
- `.env.example` — updated template
- `package.json` — name changed to `bestxen-web`

### Files Added
- `app/context/WalletProvider.tsx` — BestXenWalletProvider
- `app/components/WalletConnectButton.tsx` — dynamic wallet button
- `BESTXEN_CHANGES.md` — this file

## Deployment

### Manual steps required:

1. **Backend API** — The leaderboard data comes from `NEXT_PUBLIC_API_ENDPOINT`. This needs a bestXEN-specific backend that indexes X1 chain data. Update `.env.local` with the actual API URL when deployed.

2. **Deploy the build:**
   ```bash
   cd /home/jack/.openclaw/workspace/built/bestxen-web
   npm start  # builds + serves on port 3001
   # or: next start -p 3001
   ```

3. **Or serve the .next build** with any Node.js server (Vercel, Railway, etc.)

4. **X1 Wallet Chrome Extension:**  
   https://chromewebstore.google.com/detail/x1-wallet/kcfmcpdmlchhbikbogddmgopmjbflnae

### Stack preserved
- Next.js 14 + React 18
- Tailwind CSS + DaisyUI 4
- @coral-xyz/anchor 0.30
- @solana/web3.js 1.91
