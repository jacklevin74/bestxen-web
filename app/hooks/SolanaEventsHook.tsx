"use client";
import { useEffect, useRef, useState } from "react";
import { ConfirmOptions, Connection } from "@solana/web3.js";
import { AnchorProvider, BN, Program, web3 } from "@coral-xyz/anchor";
import * as idl from "@/app/leaderboard/target/idl/sol_xen.json";

import { fetchProgramsData } from "@/app/Api";

// bestXEN program IDs on X1 Mainnet
// These are used as fallback if the API doesn't return program IDs
const BESTXEN_PROGRAM_IDS = [
  process.env.NEXT_PUBLIC_PROGRAM_ID_MINER0 || "9jwmN4omMxC9r9Wa2YbYhVpt9qxHVzprC6ZR11KuE4GU",
  process.env.NEXT_PUBLIC_PROGRAM_ID_MINER1 || "6VAdRXDe24nDdkaBJmpws51bhUWkp8Y4QPKKPKbZMchE",
  process.env.NEXT_PUBLIC_PROGRAM_ID_MINER2 || "GvVx5YyjrYwNpkGDFyjvKwdvPCny2zWzWUaK3T3c4zQD",
  process.env.NEXT_PUBLIC_PROGRAM_ID_MINER3 || "6pR9MXWVEkRLqVBtg9FV4NYPuzjMGNHu8ukvjpzoq5G2",
];

interface SolanaEventsContextType {
  refreshRate: number;
  handleEventBatch?: (eventHashes: EventHash[]) => void;
}

export interface EventHash {
  slot: bigint;
  user: web3.PublicKey;
  ethAccount: number[];
  hashes: number;
  superhashes: number;
  points: BN;
}

export function useSolanaEvents({
  refreshRate,
  handleEventBatch,
}: SolanaEventsContextType) {
  const [programsIds, setProgramsIds] = useState<string[]>([]);
  const eventsBuffer = useRef<EventHash[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  function useRefEventListener(fn: any) {
    const fnRef = useRef(fn);
    fnRef.current = fn;
    return fnRef;
  }

  useEffect(() => {
    // Try to fetch program IDs from API, fall back to hardcoded bestXEN IDs
    fetchProgramsData()
      .then((programs) => {
        if (programs && programs.length > 0) {
          setProgramsIds(programs);
        } else {
          setProgramsIds(BESTXEN_PROGRAM_IDS);
        }
      })
      .catch(() => {
        // API unavailable — use hardcoded bestXEN program IDs
        console.log("Using hardcoded bestXEN program IDs for X1 mainnet");
        setProgramsIds(BESTXEN_PROGRAM_IDS);
      });
  }, []);

  const handleEventRef = useRefEventListener(handleEventBatch);

  useEffect(() => {
    const rpcEndpoint =
      process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ||
      "https://rpc.mainnet.x1.xyz";
    const wsEndpoint =
      process.env.NEXT_PUBLIC_SOLANA_WS_ENDPOINT ||
      "wss://rpc.mainnet.x1.xyz";

    const connection = new Connection(rpcEndpoint, {
      commitment: "finalized",
      wsEndpoint: wsEndpoint,
    });

    const anchorOptions = {
      skipPreflight: false,
      commitment: "finalized",
      preflightCommitment: "finalized",
      maxRetries: 10,
    } as ConfirmOptions;

    const provider = new AnchorProvider(connection, null as any, anchorOptions);
    const programs: Program<any>[] = [];
    const listeners: number[] = [];

    for (let i = 0; i < programsIds.length; i++) {
      const idlClone = JSON.parse(JSON.stringify(idl));
      idlClone.address = programsIds[i];
      programs.push(new Program(idlClone as any, provider));

      console.log(`[bestXEN] Listening to hash events: ${programsIds[i]}`);
      listeners[i] = programs[i].addEventListener(
        "hashEvent",
        (event: EventHash) => {
          eventsBuffer.current.push(event);
        },
      );
    }

    intervalId.current = setInterval(() => {
      if (eventsBuffer.current.length > 0) {
        handleEventRef.current(eventsBuffer.current);
        eventsBuffer.current = [];
      }
    }, refreshRate);

    return () => {
      for (let i = 0; i < programsIds.length; i++) {
        console.log(`[bestXEN] stop listening to hash events: ${programsIds[i]}`);
        programs[i].removeEventListener(listeners[i]).then();
      }

      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [refreshRate, programsIds, handleEventRef]);

  return handleEventRef;
}
