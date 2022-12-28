import React from "react";
import Web3 from "web3";

const Navigation = ({
  account,
  editedAccount,
  setAccount,
  setEditedAccount,
}) => {
  const handleClick = async () => {
    // const web3 = window.web3;
    // const accountAddress = await web3.eth.getAccounts();
    // console.log(accountAddress);
    // setAccount(accountAddress[0]);
    // setEditedAccount(
    //   accountAddress[0].slice(0, 6) + "..." + accountAddress[0].slice(38, 42)
    // );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setEditedAccount(
      accounts[0].slice(0, 6) + "..." + accounts[0].slice(38, 42)
    );
  };
  return (
    <nav>
      <div>Web3 Storage</div>
      {account ? (
        <button>{editedAccount}</button>
      ) : (
        <button onClick={handleClick}>Connect</button>
      )}
    </nav>
  );
};

export default Navigation;
