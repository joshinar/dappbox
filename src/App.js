import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import config from './config.json';
import abi from './abis/dappbox.json';
import Navbar from './components/Navbar';
import FileHandler from './components/FileHandler';
import Table from './components/Table';
import './App.css';
const App = () => {
  const [account, setAccount] = useState(null);
  const [dappbox, setDappbox] = useState(null);
  const [provider, setProvider] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // connect to blockchain
  const loadBlockChain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const netowrk = await provider.getNetwork();
    const account = await signer.getAddress();
    const dappbox = await new ethers.Contract(
      config[netowrk.chainId].address,
      abi,
      provider
    );
    setProvider(provider);
    setDappbox(dappbox);
    setAccount(account);
  };

  useEffect(() => {
    loadBlockChain();
  }, []);

  return (
    <div>
      <Navbar />
      <FileHandler
        dappbox={dappbox}
        setUploaded={setUploaded}
        provider={provider}
        setLoading={setLoading}
      />
      {loading ? (
        <div>
          <img
            src='https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif'
            width={200}
            height={200}
            style={{ display: 'block', margin: 'auto' }}
          />
          <h4 style={{ textAlign: 'center', marginTop: 10 }}>Loading...</h4>
        </div>
      ) : (
        <Table dappbox={dappbox} uploaded={uploaded} account={account} />
      )}
    </div>
  );
};

export default App;
