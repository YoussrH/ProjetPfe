import ProductForm from '@/app/components/DashboardComponents/ProductForm'
import React from 'react'

export default function NewArticle() {
  return (
    <div className='font-sans'>
        {/*header*/}
        <div className="sticky top-0 bg-white p-4 border-b-2 rounded-b-md">
          <h2 className='font-semibold'>Nouveau Article</h2>  
        </div>
        {/*form*/}
        {/*footer*/} 
        <div className='  flex bg-white gap-4 p-4 border-t-2 rounded-t-md'>
            <button className='bg-blue-300 border rounded-md font-semibold px-3 py-1'>Valider</button>
            <button  className='bg-red-300 border font-semibold rounded-md px-3 py-1'>Annuler</button>
        </div>
    </div>
  )
}
