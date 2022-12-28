import Storage from "./contracts/Storage.json";
import Navigation from "./components/Navigation";
import Web3 from "web3";
import React, { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState();
  const [editedAccount, setEditedAccount] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. Need MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    //when accounts changed
    window.ethereum.on("accountsChanged", async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setEditedAccount(
          accounts[0].slice(0, 6) + "..." + accounts[0].slice(38, 42)
        );
      } else {
        window.alert("Non-Ethereum browser detected. Need MetaMask!");
      }
    });

    // extract netword id and create contract
    const networkId = await web3.eth.net.getId();
    const networkData = Storage.networks[networkId];
    console.log(networkData);
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <>
      <Navigation
        account={account}
        editedAccount={editedAccount}
        setAccount={setAccount}
        setEditedAccount={setEditedAccount}
      />
    </>
  );
}

export default App;
