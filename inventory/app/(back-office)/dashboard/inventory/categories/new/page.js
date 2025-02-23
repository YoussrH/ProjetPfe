import HeaderForm from '@/app/components/DashboardComponents/HeaderForm'
import ProductForm from '@/app/components/DashboardComponents/ProductForm'

import React from 'react'

export default function NewCategories() {
  return (
    <div className='font-sans'>
      {/*header*/}
        <HeaderForm title="Nouveau Catégories" href="/dashboard/inventory"/>
        {/*form*/}

        <form action='' className="w-full max-w-4xl my-3 mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
          <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nom Produit</label>
                  <input type="text" name="name" id="name" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-100 block w-full p-2.5  " placeholder="Saisir le nom du produit" required=""/>
              </div>
              <div class="w-full">
                  <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 ">Marque</label>
                  <input type="text" name="brand" id="brand" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="La marque du produit" required=""/>
              </div>
          </div>
        </form>
        {/*footer*/} 
        {/* <div className='  flex bg-white gap-4 p-4 border-t-2 rounded-t-md'>
            <button className='bg-blue-300 border rounded-md font-semibold px-3 py-1'>Valider</button>
            <button  className='bg-red-300 border font-semibold rounded-md px-3 py-1'>Annuler</button>
        </div> */}
    </div>
  )
}
