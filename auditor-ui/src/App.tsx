import React, { useState } from 'react';
import Header from './components/header/Header';
import ABI from './constants/POR.json';
import './App.css';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import Tabs from './components/tabs/Tabs';
import ColdWallets from './ColdWallets';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  // initilise contract call is nonce use


  const getRange = () => {
    const range = ethers.BigNumber.from(ethers.utils.randomBytes(32))
    return range;
  }

  const Main = () => {
    return (
      <div className="h-[100vh]">
      <Header />
     <Tabs/>
    </div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/coldWallets" element={<ColdWallets />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
