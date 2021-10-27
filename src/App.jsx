import React from 'react'
import './App.css'
import 'gestalt/dist/gestalt.css'
import Layout from './components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
	return (
		<ChakraProvider>
			<div className="App">
				<Layout />
			</div>
		</ChakraProvider>
	)
}

export default App
