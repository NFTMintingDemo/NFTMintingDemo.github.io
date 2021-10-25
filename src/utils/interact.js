require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const {createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json');
const contractAddress = "0x94463B828225c8Aca905dC26207d2a8dAB6d3090"

//0.1 Ether
const price = "0x2386F26FC10000";
//3000000 Gwei (0.003 Ether)
const gasLimit = "0x2DC6C0";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "🦊 Wallet connected.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async() => {
  //error handling
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up Ethereum transaction
  //gasPrice denomination gwei
  const transactionParameters = {
        from: window.ethereum.selectedAddress,
        to: contractAddress,
        gas: gasLimit,
        gasPrice: "0x3B9ACA00",
        value: price,
        data: window.contract.methods.mintNFT(1).encodeABI()
  }
  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
    .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
 }