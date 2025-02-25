import HeaderForm from '@/app/components/DashboardComponents/HeaderForm'
import React from 'react'
import AjouterArticle from '@/app/components/DashboardComponents/ArticleComp/AjouterArticle'

export default function NewArticle() {
  return (
    <div className='font-sans min-h-screen flex flex-col'>
        {/*header*/}
      <HeaderForm title="Nouveau Article" href="/dashboard/inventory" />

        {/*form*/}
        <AjouterArticle/>
        {/*footer*/} 
  {/*       <div className='flex bg-white gap-4 p-4 border-t-2 rounded-t-md sticky bottom-0'>
        <button className='bg-blue-300 border rounded-md font-semibold px-3 py-1'>Valider</button>
        <button className='bg-red-300 border font-semibold rounded-md px-3 py-1'>Annuler</button>
      </div> */}
    </div>
  )
}
