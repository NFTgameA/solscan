// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import { SendSol } from '../../components/SendSol';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { GetTokens } from 'components/GetTokens';
export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (


    <div style={{ display: "flex", alignItems: "center" }} className="md:hero mx-auto p-4 flex-col  justify-center flex lg:flex-row">
     
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] h-14">
        SolanaExplorer.info <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <div className="flex items-stretch">
          
            <Link href="/basics">
              <a className="btn btn-ghost btn-sm rounded-btn">Basics</a>
            </Link>
            <Link href="/explorer">
              <a className="btn btn-ghost btn-sm rounded-btn">Explorer</a>
            </Link>
            <Link href="https://t.me/SolanaExplorer_info">
              <a className="btn btn-ghost btn-sm rounded-btn">Telegram</a>
            </Link>
           
            <Link href="https://twitter.com/SolExplorerInfo">
              <a className="btn btn-ghost btn-sm rounded-btn">Twitter</a>
            </Link>
            
          </div>
       
        <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Start building on Solana  </code>
          </pre>
        </div>
        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>
        <div>
          <GetTokens />
          {/* <SendSol /> */}
        </div>
      </div>
    </div>
  );
};
