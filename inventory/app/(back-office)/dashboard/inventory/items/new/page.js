import HeaderForm from '@/app/components/DashboardComponents/HeaderForm'
import ProductForm from '@/app/components/DashboardComponents/ProductForm'
import React from 'react'

export default function NewArticle() {
  return (
    <div className='font-sans'>
        {/*header*/}
      <HeaderForm title="Nouveau Article" href="/dashboard/inventory" />

        {/*form*/}
        
        {/*footer*/} 
        <div className='  flex bg-white gap-4 p-4 border-t-2 rounded-t-md'>
            <button className='bg-blue-300 border rounded-md font-semibold px-3 py-1'>Valider</button>
            <button  className='bg-red-300 border font-semibold rounded-md px-3 py-1'>Annuler</button>
        </div>
    </div>
  )
}
