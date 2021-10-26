import React, { useEffect, useState } from 'react';
import {
  Box, Button, Flex, Heading, Link, Text, Toast as GestaltToast, TextField,
} from 'gestalt';
import Particles from 'react-particles-js';
import {
 mintNFT, 
 getTokenSupply,
} from './utils/interact';
import PARTICLE_PARAMS from './utils/constants';
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import { useToast } from "@chakra-ui/react";


const Minter = () => {
  const [value] = useState(1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toast = useToast();

  const handlePopoverClose = () => setIsPopoverOpen(false);
  const handlePopoverOpen = () => setIsPopoverOpen(true);
  const [supply, setSupply] = useState('');

  useEffect(() => {
    // const { address, status } = await getCurrentWalletConnected();
    // setWallet(address);
    // setStatus(status);

    addWalletListener();
    const fetchTokenSupply = async() => {
      setSupply(await getTokenSupply());
    }
    fetchTokenSupply();
  }, []);

  const onMintPressed = async () => {
    const { status, success, title} = await mintNFT();
    toast({
      // title: title || "",
      // description: status,
      render: () => (
        <GestaltToast 
          text={
            <>
            <Text align="center" weight="bold" color={success ? "green": "white"}>{title}</Text>
            {status}
            </>
          } 
          variant={success ? "default": "error"}  
        />
      ),
      // status: success ? "success": "error",
      isClosable: true,
      duration: 30000,
    })
  };

  const noop = () => {};

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log(accounts);
        if (accounts.length > 0) {
        } else {
        }
      });
    } else {
      toast({
        title: "Connection issue.",
        description: "Metamask not installed",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
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
            <Box paddingX={10}>
              <ConnectButton handlePopoverOpen={handlePopoverOpen}/>
              <AccountModal isPopoverOpen={isPopoverOpen} onPopoverClose={handlePopoverClose}/>
            </Box>
          </Flex.Item>
        </Flex>
        <Box paddingY={4}>
          <Flex gap={4} justifyContent="center" alignItems="start">
            <Heading size="lg" color="orchid">
              wow
              {/* {supply} */}
            </Heading>
          </Flex>
        </Box>
        <Box paddingY={4}>
          <Flex gap={4} justifyContent="center" alignItems="start">
            <TextField disabled type="number" id="amountToMintTextField" onChange={noop} value={value} />
            <Button id="mintButton" color="gray" onClick={onMintPressed} text="Mint NFT" />
          </Flex>
        </Box>
      </Box>
      <Particles
        params={PARTICLE_PARAMS}
      />
    </>
  );
};

export default Minter;
