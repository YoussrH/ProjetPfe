import HeaderForm from '@/app/components/DashboardComponents/HeaderForm'
import MarqueFixedHeader from '@/app/components/DashboardComponents/MarqueCom/MarqueFixedHeader'
import MarqueTable from '@/app/components/DashboardComponents/MarqueCom/MarqueTables'
import React from 'react'

export default function Brand() {
  return (
 <div>
    <MarqueFixedHeader label="Gestion des Marques"/>    
    <MarqueTable/>
 </div>
   
  )
}
