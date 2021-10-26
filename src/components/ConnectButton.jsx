import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";

export default function ConnectButton({handlePopoverOpen}) {
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    const handleConnectWallet = () => {
        activateBrowserWallet();
    }

    return account ? (
        <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
      >
        <Box 
            display="flex"
            alignItems="center" 
            px="2"
            gridGap={2}
        >
            <Text color="white" fontSize="md" fontWeight={800}>
                bal
            </Text>
            <Text color="white" fontSize="md">
                {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
            </Text>
        </Box>
        <Button
          bg="gray.800"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
            backgroundColor: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          onClick={handlePopoverOpen}
        >
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </Text>
          <Identicon />
        </Button>
      </Box>
    ) : (
        <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
    );
}
