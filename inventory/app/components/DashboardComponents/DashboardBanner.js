"use client";
import React, { useState } from 'react'
import { RiCloseLine } from "react-icons/ri";
export default function DashboardBanner() {
    const [hidden,setHidden] =useState(false);

  return (
    <div className={`${hidden ? "hidden":" relative font-sans grid grid-cols-12 items-center gap-3 py-6 px-8 bg-white "}`}>
        {/*Icon*/}
        <div className='col-span-2'>
        <img src='/credit-card.png' className='w-20 h-20 '/>

        </div>
        {/*text*/}
        <div className="col-span-6 ">
            <h2 className='font-semibold text-xl'>Start Accepting online payments</h2>
            <p>Businesses are moving towards online paymentsas they're easy ,secure and fast . 
                try them for your Businesse today.
                 </p>
        </div>
        {/*button*/}
        <div className='col-span-3'>
        <button className="p-2 px-5 uppercase bg-blue-700 text-white rounded-lg ">Enable</button>

        </div>
        {/*closebutton*/}
        <button className="absolute   top-4 right-6" onClick={()=>setHidden(true)}>
        <RiCloseLine />
        </button>
    </div>
  )
}
