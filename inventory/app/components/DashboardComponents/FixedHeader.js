import { Grid, HelpCircle, LayoutGrid, List, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FixedHeader() {
  return (
    <div className="flex justify-between items-center  font-sans bg-white py-4 px-4 ">
            <button className="">Tous les articles</button>
            <div className="flex gap-4">
                {/*new*/}
                <Link href="#" className="p-1 rounded-md bg-blue-600 flex px-3 text-white  items-center space-x-2">
                        <Plus className="text-slate-50 w-4 h-4"/>
                        <span>Nouveau</span>
                </Link>
                {/*Layout*/}
                <div className="flex  rounded-md overflow-hidden">
                    <button className="bg-gray-200 p-2  border-r border-gray-300 ">
                        <List className="w-4 h-4"/>
                    </button>
                    <button className="bg-gray-100 p-2  ">
                        <LayoutGrid className="w-4 h-4"/>
                    </button>

                </div>

                {/*More */}
                <button className="bg-gray-100 p-2 rounded-md ">
                    <MoreHorizontal className="w-5 h-5"/>
                </button>                    
                {/*Help*/}
                <button className="bg-orange-400 p-2  text-white  rounded-md">
                    <HelpCircle className="w-5 h-5"/>
                </button>

            </div>
    </div>
  )
}
