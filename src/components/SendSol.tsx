import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

export const SendSol: FC = () => {
    const { connection } = useConnection();
    const [amount, setAmount] = useState(0.1);
    const wallet = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const onClick = useCallback(async () => {
        if (!wallet.connected || !wallet.publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }
        try {
            const toPublicKey = new PublicKey('GUHq6yyX7f2HW91hmwWCkFkHpGEchUJC4uvP8BFTsrEN'); // Replace with the recipient's public key
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: toPublicKey,
                    lamports: LAMPORTS_PER_SOL * amount, // Amount of SOL to send
                })
            );

            const hash = await wallet.sendTransaction(transaction, connection);
            // setTxId(hash);
        } catch (error) {
            console.log(error);
        }
    }, [wallet, connection, getUserSOLBalance,amount]);

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="mb-4 p-2 border border-blue-500 rounded bg-gray-800 text-white"
                placeholder="Enter SOL amount"
            />
            <button
                className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
            >
                <span>Mint </span>
            </button>
        </div>
    );
};
