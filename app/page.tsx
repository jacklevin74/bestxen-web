"use client";

import { NavBar } from "@/app/components/NavBar";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useStatsData } from "@/app/hooks/StateDataHook";
import { ReactNode } from "react";
import { MdLeaderboard } from "react-icons/md";
import { SiGitbook } from "react-icons/si";
import { TbBuildingCommunity } from "react-icons/tb";
import { BiSolidPurchaseTag } from "react-icons/bi";

function Section({
  children,
  title,
  backgroundColor,
}: {
  children: ReactNode;
  title: string;
  backgroundColor: string;
}) {
  return (
    <div>
      <div
        className={`flex flex-content justify-center my-0 py-10 w-full mx-0 ${backgroundColor}`}
      >
        <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-[940px]">
          <div className="card-body">
            <div className="card-title mb-6">
              <h2 className="text-2xl">{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [stateData] = useStatsData();

  const bestXenValue = () => {
    if (!stateData?.solXen) {
      return "0";
    }
    return Intl.NumberFormat("en-US").format(
      Number(stateData.solXen / BigInt(10 ** 9)),
    );
  };

  const hashesValue = () => {
    if (!stateData) {
      return "0";
    }
    return Intl.NumberFormat("en-US").format(stateData.hashes);
  };

  const superHashesValue = () => {
    if (!stateData) {
      return "0";
    }
    return Intl.NumberFormat("en-US").format(stateData.superHashes);
  };

  return (
    <main className="flex flex-col mx-0 min-h-screen">
      <NavBar />

      <div className="hero h-[500px] bg-base-200">
        <div className="hero-content text-center">
          <div className="mx-2 sm:mx-8 max-w-[940px]">
            <h1 className="text-4xl sm:text-5xl font-bold">
              PROOF OF WORK MINING ON X1
            </h1>
            <div className="divider"></div>
            <p className="mb-5 mx-auto max-w-lg">
              bestXEN is a fairly distributed 1st principles community token
              earned through PoW
              <br className="sm:hidden" /> mining on the X1 blockchain.
            </p>

            <Link href="./leaderboard" className="btn btn-primary">
              <MdLeaderboard className="hidden sm:block" />
              Leaderboard
            </Link>

            <Link
              href="https://docs.x1.xyz/"
              className="btn btn-secondary ml-2"
              target="_blank"
            >
              <SiGitbook className="hidden sm:block" />
              Docs
            </Link>

            <div className="mb-3 md:hidden"></div>
            <Link
              href="https://t.me/+Z5kEez70pyQ5NTAz"
              className="btn btn-accent ml-2"
              target="_blank"
            >
              <TbBuildingCommunity className="hidden sm:block" /> Hashhead{" "}
              <div className="hidden sm:inline">Community</div>
            </Link>

            <Link
              href="https://app.xdex.xyz/swap"
              className="btn btn-success ml-2"
              target="_blank"
            >
              <BiSolidPurchaseTag className="hidden sm:block" /> Buy bestXEN
            </Link>
          </div>
        </div>
      </div>

      <Section title="Total Supply" backgroundColor="bg-base-100">
        <div className="stats stats-vertical sm:stats-horizontal mx-auto">
          <div className="stat px-0 sm:px-4 md:px-8">
            <div className="stat-title">Hashes</div>
            <div className="stat-value text-secondary sm:text-[1.6rem] md:text-4xl">
              {hashesValue()}
            </div>
          </div>

          <div className="stat px-0 sm:px-4 md:px-8">
            <div className="stat-title">Super Hashes</div>
            <div className="stat-value text-secondary sm:text-[1.6rem] md:text-4xl">
              {superHashesValue()}
            </div>
          </div>

          <div className="stat px-0 sm:px-4 md:px-8">
            <div className="stat-title">bestXEN</div>
            <div className="stat-value text-secondary sm:text-[1.6rem] md:text-4xl">
              {bestXenValue()}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="bestXEN — PoW Mining on X1 Blockchain"
        backgroundColor="bg-base-200"
      >
        <article className="prose">
          <p className="mb-4">
            bestXEN brings the proven PoW mining mechanics of solXEN to the{" "}
            <Link href="https://x1.xyz" className="link" target="_blank">
              X1 blockchain
            </Link>
            . X1 is a high-performance SVM-based blockchain with ~400ms block
            times, zero-cost validator votes, and dynamic base fees.
          </p>
          <p className="my-4">
            Connect your{" "}
            <Link
              href="https://chromewebstore.google.com/detail/x1-wallet/kcfmcpdmlchhbikbogddmgopmjbflnae"
              className="link"
              target="_blank"
            >
              X1 Wallet
            </Link>{" "}
            or{" "}
            <Link
              href="https://www.backpack.app/"
              className="link"
              target="_blank"
            >
              Backpack
            </Link>{" "}
            to start mining bestXEN on X1.
          </p>
        </article>
      </Section>

      <Section title="How Does It Work?" backgroundColor="bg-base-100">
        <article className="prose">
          <p className="mb-4">
            Mining for <code>420</code> hashes involves sending a transaction
            using the bestXEN miner script on X1. If the priority fee is high
            enough the X1 leader as well as the rest of the validator cluster
            will then run the 420miner script.
          </p>
          <p className="mb-8">
            The script leverages the cryptographic hashing algorithm Keccak256
            to find a hash containing a string with <code>420</code>/
            <code>42069</code> in it. Upon successfully finding the correct hash
            the miner is rewarded with bestXEN, as well as becoming eligible for
            XN airdrop via included ethereum address.
          </p>
        </article>
      </Section>

      <Section title="Tokenomics" backgroundColor="bg-base-200">
        <article className="prose">
          <h3 className="text-lg my-4 font-bold">bestXEN</h3>
          <p className="mb-1">
            A miner is rewarded bestXEN for every <code>420</code> hash found
            according to this formula:
          </p>
          <code>420hash * AMP = bestXEN</code>
          <p className="mt-1 mb-5">where AMP is the amplification.</p>
          <p className="mb-5">
            The AMP starts at 300 and reduces by 1 every 100,000 blocks. Given
            that each X1 block is 400 ms the AMP will be reduced to 0 in about
            139 days, which makes the limited distribution period for bestXEN.
          </p>
          <p className="mb-5">
            The probability of finding a <code>420</code> hash is roughly 95%.
            bestXEN is directly issued upon finding a <code>420</code> hash and
            is transferable.
          </p>

          <h3 className="text-lg mb-4 font-bold">Super Hashes</h3>
          <p className="mb-8">
            If <code>42069</code> is found in a hash, the amount of bestXEN is
            multiplied by 250. The probability of finding a <code>42069</code>{" "}
            hash is roughly 0.2%, which is 250X harder to find than a{" "}
            <code>420</code> hash.
          </p>
        </article>
      </Section>

      <Section title="Wallet Support" backgroundColor="bg-base-100">
        <article className="prose">
          <p className="mb-4">bestXEN on X1 supports the following wallets:</p>
          <ul>
            <li>
              <Link
                href="https://chromewebstore.google.com/detail/x1-wallet/kcfmcpdmlchhbikbogddmgopmjbflnae"
                className="link"
                target="_blank"
              >
                X1 Wallet
              </Link>{" "}
              — Official X1 blockchain wallet (Chrome extension)
            </li>
            <li>
              <Link
                href="https://www.backpack.app/"
                className="link"
                target="_blank"
              >
                Backpack
              </Link>{" "}
              — Multi-chain wallet with X1 support
            </li>
          </ul>
          <p className="mt-4">
            Click <strong>Connect Wallet</strong> in the top-right corner to get
            started.
          </p>
        </article>
      </Section>

      <Footer />
    </main>
  );
}
