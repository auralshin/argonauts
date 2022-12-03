import React, { ReactElement} from 'react'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
type Tabs = {
    id: number,
    title: string,
    content: ReactElement
}

function Tabs() {

    // create tabs
    const [tabs, setTabs] = React.useState([
        {
            id: 1,
            title: 'Tab 1',
            content: <Tab1 />
        },
        {
            id: 2,
            title: 'Tab 2',
            content: <Tab2 />
        },
    ])

    // create state for active tab
    const [activeTab, setActiveTab] = React.useState(tabs[0])
    
    const handleClick = (tab : Tabs) => {
        setActiveTab(tab)
    }


  return (
    <>
    <div className='flex justify-evenly mt-3 items-center'>
        <div className='flex flex-col items-center'>
            <div onClick={(e) => handleClick(tabs[0])} className='bg-black cursor-pointer w-[15vw] text-center rounded-3xl p-2'>
                <div className='text-white text-lg font-normal'>
                    Push Challenge
                </div>
            </div>    
        </div>
        <div className='flex flex-col items-center'>
            <div onClick={(e) => handleClick(tabs[1])} className='bg-black cursor-pointer w-[15vw] text-center rounded-3xl p-2'>
                <div className='text-white text-lg font-normal'>
                    Validate
                </div>
            </div>
        </div>
    </div>
    <div className='mt-5 flex justify-center items-center'>
    {
        activeTab.content
    }
    </div>
    </>
  )
}

export default Tabs