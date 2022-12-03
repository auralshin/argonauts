import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <div className='bg-black flex justify-between items-center p-5 rounded-3xl mt-2 mx-2 '>
                <div className='text-white text-lg font-normal'>
                  Proof of Trust
                </div>
                <div>

                <ConnectButton />
                </div>


    </div>
  )
}

export default Header