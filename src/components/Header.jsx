import React, { useState } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { Box, Flex, Heading } from 'gestalt'
import { IconButton, Text } from '@chakra-ui/react'

import AccountPopover from './AccountPopover'
import ConnectButton from './ConnectButton'
import { OpenSeaIcon } from 'assets/Icons'

export default function Header() {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const handlePopoverClose = () => setIsPopoverOpen(false)
	const handlePopoverOpen = () => setIsPopoverOpen(true)

	return (
		<Box color="darkGray" padding={2}>
			<Flex justifyContent="end">
				{/* left */}
				<Flex.Item>
					<Heading size="sm" color="lightGray">
						pixel piracy
					</Heading>
				</Flex.Item>
				<Flex.Item flex="grow" />
				{/* center */}
				<Flex.Item>
					<Flex justifyContent="center" gap={8}>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							mint
						</Text>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							about
						</Text>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							team
						</Text>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							keys
						</Text>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							chests
						</Text>
						<Text as="Button" fontSize="2xl" color="whiteAlpha.900">
							pirates
						</Text>
					</Flex>
				</Flex.Item>
				<Flex.Item flex="grow" />
				{/* right*/}
				<Flex.Item>
					<Flex>
						<Box paddingX={2}>
							<IconButton
								variant="unstyled"
								color="white"
								aria-label="Twitter link"
								fontSize="40px"
								icon={<FaTwitter />}
							/>
						</Box>
						<Box paddingX={2}>
							<IconButton
								variant="unstyled"
								colorScheme="yellow"
								color="white"
								aria-label="Discord link"
								fontSize="40px"
								icon={<FaDiscord />}
							/>
						</Box>
						<Box paddingX={2}>
							<IconButton
								variant="unstyled"
								color="white"
								aria-label="Open Sea link"
								fontSize="px"
								icon={<OpenSeaIcon fontSize="36px" />}
							/>
						</Box>
						<Box paddingX={10}>
							<ConnectButton handlePopoverOpen={handlePopoverOpen} />
							<AccountPopover
								isPopoverOpen={isPopoverOpen}
								onPopoverClose={handlePopoverClose}
							/>
						</Box>
					</Flex>
				</Flex.Item>
			</Flex>
		</Box>
	)
}
