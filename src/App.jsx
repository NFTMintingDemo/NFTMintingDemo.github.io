import React from 'react';
import './App.css';
import 'gestalt/dist/gestalt.css';
import Minter from './Minter';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Minter />
      </div>
    </ChakraProvider>
  );
}

export default App;
