import React, { useState } from 'react';
import Header from './components/header/Header';
import ABI from './constants/POR.json';
import './App.css';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import Tabs from './components/tabs/Tabs';

function App() {

  // initilise contract call is nonce use


  const getRange = () => {
    const range = ethers.BigNumber.from(ethers.utils.randomBytes(32))
    return range;
  }

  const blockNumber = useContractRead({
    address: '',
    abi: ABI,
    functionName: 'epochRange',
    args: [1],
  })



  return (
    <div className="h-[300vh]">
      <Header />
     {/* Tabs */}
     <Tabs/>
    </div>
  );
}

export default App;
