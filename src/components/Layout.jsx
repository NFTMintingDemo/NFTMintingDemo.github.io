import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Text, TextField } from 'gestalt'
import Particles from 'react-particles-js'
import { mintNFT, getTokenSupply } from 'utils/interact'
import PARTICLE_PARAMS from 'utils/constants'
import ConnectButton from './ConnectButton'
import AccountPopover from './AccountPopover'
import { useToast } from '@chakra-ui/react'

const Layout = () => {
	const [value] = useState(1)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const toast = useToast()

	const handlePopoverClose = () => setIsPopoverOpen(false)
	const handlePopoverOpen = () => setIsPopoverOpen(true)
	const [supply, setSupply] = useState('')

	const onAccountChange = useCallback(() => {
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', (accounts) => {
				if (accounts.length > 0) {
					toast({
						render: () => (
							<Box
								rounding="pill"
								padding={6}
								color="white"
								display="flex"
								justifyContent="center"
							>
								<Text align="center" weight="bold" color="green">
									Connected
								</Text>
							</Box>
						),
						isClosable: true,
						duration: 3000,
					})
				} else {
					console.log('....')
					toast({
						render: () => (
							<Box
								rounding="pill"
								padding={6}
								color="orange"
								display="flex"
								justifyContent="center"
								direction="column"
							>
								<Text align="center" weight="bold" color="white">
									Connection Issues
								</Text>
								<Text align="center">Metamask not installed</Text>
							</Box>
						),
						isClosable: true,
						duration: 3000,
					})
				}
			})
		}
	}, [toast])

	useEffect(() => {
		onAccountChange()
		const fetchTokenSupply = async () => {
			setSupply(await getTokenSupply())
		}
		fetchTokenSupply()
	}, [onAccountChange])

	const onMintPressed = async () => {
		const { status, success, title } = await mintNFT()
		toast({
			render: () => (
				<Box
					rounding="pill"
					padding={6}
					color={success ? 'white' : 'red'}
					display="flex"
					justifyContent="center"
					direction="column"
				>
					<Text
						align="center"
						weight="bold"
						color={success ? 'green' : 'white'}
					>
						{title}
					</Text>
					<Text align="center">{status}</Text>
				</Box>
			),
			isClosable: true,
			duration: 30000,
		})
	}

	const noop = () => {}

	return (
		<>
			<Box className="Layout" padding={4}>
				<Flex justifyContent="end">
					<Flex.Item>
						<Heading color="lightGray">project name</Heading>
					</Flex.Item>
					<Flex.Item flex="grow" />
					<Flex.Item>
						<Box paddingX={10}>
							<ConnectButton handlePopoverOpen={handlePopoverOpen} />
							<AccountPopover
								isPopoverOpen={isPopoverOpen}
								onPopoverClose={handlePopoverClose}
							/>
						</Box>
					</Flex.Item>
				</Flex>
				<Box paddingY={4}>
					<Flex gap={4} justifyContent="center" alignItems="start">
						<Heading size="lg" color="orchid">
							supply:
							{' ' + supply}
						</Heading>
					</Flex>
				</Box>
				<Box paddingY={4}>
					<Flex gap={4} justifyContent="center" alignItems="start">
						<TextField
							disabled
							type="number"
							id="amountToMintTextField"
							onChange={noop}
							value={value}
						/>
						<Button
							id="mintButton"
							color="gray"
							onClick={onMintPressed}
							text="Mint NFT"
						/>
					</Flex>
				</Box>
			</Box>
			<Particles params={PARTICLE_PARAMS} />
		</>
	)
}

export default Layout
