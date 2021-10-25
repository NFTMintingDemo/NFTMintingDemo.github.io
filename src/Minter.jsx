import React, { useEffect, useState } from 'react';
import {
  Box, Button, Flex, Heading, Text, TextField,
} from 'gestalt';
import Particles from 'react-particles-js';
import {
  connectWallet, getCurrentWalletConnected, mintNFT, getTokenSupply,
} from './utils/interact';
import PARTICLE_PARAMS from './utils/constants';

const Minter = () => {
  // State variables
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');
  const [value] = useState(1);
  const [supply, setSupply] = useState('');

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
    setSupply(getTokenSupply());
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT();
    setStatus(status);
  };

  const noop = () => {};

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log(accounts);
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus('🦊 Wallet connected.');
        } else {
          setWallet('');
          setStatus('🦊 Connect to Metamask using the top right button.');
        }
      });
    } else {
      setStatus(
        <Text>
          {' '}
          🦊
          {' '}
          <a target="_blank" href="https://metamask.io/download.html" rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </Text>,
      );
    }
  }

  return (
    <>
      <Box className="Minter" padding={4}>
        <Flex justifyContent="end">
          <Flex.Item>
            <Heading color="lightGray">"project name"</Heading>
          </Flex.Item>
          <Flex.Item flex="grow" />
          <Flex.Item>
            <Button
              id="walletButton"
              onClick={connectWalletPressed}
              text={
              walletAddress.length > 0 ? (
                `Connected: ${
                  String(walletAddress).substring(0, 6)
                }...${
                  String(walletAddress).substring(38)}`
              ) : (
                <Text>Connect Wallet</Text>
              )
}
            />
          </Flex.Item>
        </Flex>
        <Box paddingY={4}>
          <Flex gap={4} justifyContent="center" alignItems="start">
            <Heading size="lg" color="orchid">
              wow
            </Heading>
          </Flex>
        </Box>
        <Box paddingY={4}>
          <Flex gap={4} justifyContent="center" alignItems="start">
            <TextField disabled type="number" id="amountToMintTextField" onChange={({ value }) => noop} value={value} />
            <Button id="mintButton" color="gray" onClick={onMintPressed} text="Mint NFT" />
          </Flex>
          <Box paddingY={4}>
            <Flex justifyContent="center" alignItems="start">
              <Text size="lg" color="lightGray">
                {status}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Particles
        params={PARTICLE_PARAMS}
      />
    </>
  );
};

export default Minter;
