import React, { useCallback, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { Box, Text } from 'gestalt'
import Particles from 'react-particles-js'

import { mintNFT, getTokenSupply } from 'utils/interact'
import PARTICLE_PARAMS from 'utils/constants'
import Header from './Header'
import Landing from './Landing'

const Layout = () => {
	const [value] = useState(1)
	const toast = useToast()

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

	return (
		<>
			<Box className="Layout">
				{/* Header */}
				<Header />
				{/* Landing */}
				<Landing supply={supply} value={value} onMintPressed={onMintPressed} />
			</Box>
			<Particles params={PARTICLE_PARAMS} />
		</>
	)
}

export default Layout
