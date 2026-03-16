"use client";

import { FaGithub } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { SiGitbook } from "react-icons/si";
import { GiMiningHelmet } from "react-icons/gi";

import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import tailwindConfig from "@/tailwind.config";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import wallet button to avoid SSR issues
const WalletConnectButton = dynamic(
  () => import("@/app/components/WalletConnectButton"),
  { ssr: false }
);

export const NavBar = () => {
  const { changeTheme } = useContext(ThemeContext);

  function navItems() {
    return (
      <>
        <li>
          <Link href="/leaderboard">
            <MdLeaderboard /> Leaderboard
          </Link>
        </li>
        <li>
          <Link href="https://docs.x1.xyz/" target="_blank">
            <SiGitbook />
            Docs
          </Link>
        </li>
        <li>
          <Link href="https://app.xdex.xyz/swap">
            <GiMiningHelmet />
            Trade on X1
          </Link>
        </li>
        <li>
          <details>
            <summary>
              <MdLightMode /> Theme
            </summary>
            <ul className="p-2">
              {tailwindConfig.daisyui.themes.map((theme: string) => (
                <li key={theme}>
                  <a onClick={() => (changeTheme ? changeTheme(theme) : null)}>
                    {theme}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </>
    );
  }

  return (
    <div className="navbar p-0 bg-base-100 shadow-xl opacity-85 flex justify-between z-[20]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems()}
          </ul>
        </div>

        <a className="btn btn-link animate-none text-xl font-bold" href="/">
          bestXEN
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems()}</ul>
      </div>

      <div className="navbar-end gap-2">
        <WalletConnectButton />
        <Link href="https://github.com/FairCrypto/sol-xen" className="hidden sm:block">
          <button className="btn btn-outline btn-accent">
            <FaGithub size="1.5em" />
            GitHub
          </button>
        </Link>
      </div>
    </div>
  );
};
