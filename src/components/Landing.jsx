import React from 'react'
import { Box, Button, Flex, Heading, TextField } from 'gestalt'
export default function Landing({ supply, value, onMintPressed }) {
	const noop = () => {}

	return (
		<>
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
		</>
	)
}
