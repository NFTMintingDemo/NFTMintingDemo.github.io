import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";
import { Box, Button, Flex, Heading, Text, TextField, Title } from "gestalt";
import Particles from 'react-particles-js';


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [value, setValue] = useState(1);
 
  useEffect(async () => { 
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener();
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

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("🦊 Wallet connected.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <Text>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </Text>
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
        <Flex.Item flex="grow"/>
        <Flex.Item>
          <Button
            id="walletButton"
            onClick={connectWalletPressed} 
            text={
              walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
                ) : (
                  <Text>Connect Wallet</Text>
                  )}
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
          <TextField disabled type="number" id="amountToMintTextField" onChange={({ value}) => noop} value={value} />
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
      params={{
        particles: {
          number: {
            value: 100,
            limit: 150,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "line",
            stroke: {
              width: 0,
              color: "#ffffff"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "images/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.5,
              sync: false
            }
          },
          size: {
            value: 30,
            random: true,
            anim: {
              enable: true,
              speed: 10,
              size_min: 10,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        backgroundMask: {
          enable: true,
          cover: {
            color: {
              value: {
                r: 26,
                g: 16,
                b: 28
              }
            }
          }
        },
        retina_detect: true,
        fps_limit: 60,

      }}
    />
 </>
  );
};

export default Minter;
