import React, {useRef} from "react"
import { Box as GestaltBox, Heading, Toast as GestaltToast } from "gestalt";
import {
    Box,
    Button,
    Flex,
    Link,
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    PopoverTrigger,
    PopoverArrow,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
  import { useEthers } from "@usedapp/core";
  import Identicon from "./Identicon";
  import {CopyToClipboard} from 'react-copy-to-clipboard';
  
  export default function AccountPopover({ children, isPopoverOpen, onPopoverClose}) {
    const { account, deactivate } = useEthers();
    const initialFocusRef = useRef()
    const toast = useToast()

    const handleDeactivateAccount = () => {
      deactivate();
    }

    return(
      <Popover
        isOpen={isPopoverOpen}
        onClose={onPopoverClose}
        initialFocusRef={initialFocusRef}
      >
        <PopoverTrigger>
          <Box pe="10"></Box>
        </PopoverTrigger>
        <PopoverContent
          background="gray.900"
          border="1px"
          borderStyle="solid"
          borderColor="gray.700"
          borderRadius="3xl"
          width="500"
        >
          <PopoverHeader color="white" px={4} fontSize="lg" fontWeight="medium">
            Account
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton
            color="white"
            fontSize="sm"
            _hover={{
              color: "whiteAlpha.700",
            }}
          />
          <PopoverBody pt={4} px={4}>
            <Box
              borderRadius="3xl"
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.400" fontSize="sm">
                  Connected with MetaMask
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  borderColor="blue.800"
                  borderRadius="3xl"
                  color="blue.500"
                  fontSize="13px"
                  fontWeight="normal"
                  px={2}
                  height="26px"
                  _hover={{
                    background: "none",
                    borderColor: "blue.300",
                    textDecoration: "underline",
                  }}
                  onClick={handleDeactivateAccount}
                >
                  Change
                </Button>
              </Flex>
              <Flex alignItems="center" justifyContent="center" mt={2} mb={4} lineHeight={1}>
                <Identicon />
                <Text
                  color="white"
                  fontSize="xl"
                  fontWeight="semibold"
                  ml="2"
                  lineHeight="1.1"
                >
                  {account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`}
                </Text>
              </Flex>
              <Flex alignContent="center" m={3}>
                <CopyToClipboard text={account}>
                  <Button
                    variant="link"
                    color="gray.400"
                    fontWeight="normal"
                    fontSize="sm"
                    _hover={{
                      textDecoration: "none",
                      color: "whiteAlpha.800",
                    }}
                    onClick={() => toast({
                      render: () => (
                        <GestaltBox rounding='pill' padding={6} color="green" display="flex" justifyContent="center">
                          <Heading size="sm" color="white">
                          Account copied
                          </Heading>
                        </GestaltBox>
                      ),
                      duration: 3000,
                    })}
                  >
                    <CopyIcon mr={1} />
                    Copy Address
                  </Button>
                </CopyToClipboard>
                <Link
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  href={`https://ropsten.etherscan.io/address/${account}`}
                  isExternal
                  color="gray.400"
                  ml={6}
                  _hover={{
                    color: "whiteAlpha.800",
                    textDecoration: "underline",
                  }}
                >
                  <ExternalLinkIcon mr={1} />
                  View on Explorer
                </Link>
              </Flex>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
}
