import HeaderForm from '@/app/components/DashboardComponents/HeaderForm'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function NewBrand() {

  return (
    <div className='font-sans'>
      <HeaderForm title="Nouveau Marque" href="/dashboard/inventory" />
      <h2>NewBrand</h2>
    </div>
  )
}
