import React from 'react'
import HeaderColdWallet from './components/header/HeaderCold'
import Tabs from './components/tabsCW/tabCW'
function ColdWallets() {
  return (
    <div className='h-[100vh]'>
        <HeaderColdWallet />
        <Tabs />
    </div>
  )
}

export default ColdWallets