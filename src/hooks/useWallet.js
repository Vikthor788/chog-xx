import { useState } from "react";
import { BrowserProvider } from "ethers";

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [holdsChog, setHoldsChog] = useState(false);
  const [demoChogId, setDemoChogId] = useState(null);

  const connect = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  const toggleHold = () => {
    if (holdsChog) {
      setHoldsChog(false);
      setDemoChogId(null);
    } else {
      setHoldsChog(true);
      setDemoChogId(Math.floor(Math.random() * 1969) + 1);
    }
  };

  return { account, holdsChog, demoChogId, connect, toggleHold };
}
