import AperCuVentes from '@/app/components/DashboardComponents/AperCuVentes'
import CustomDataTable from '@/app/components/DashboardComponents/back-office/CustomDataTable'
import DashboardCharts from '@/app/components/DashboardComponents/back-office/DashboardCharts'
import DashboardBanner from '@/app/components/DashboardComponents/DashboardBanner'
import React from 'react'

export default function Dashboard() {
  return (
    <div className='font-sans'>
      <DashboardBanner/>
      <AperCuVentes/>
        {/* charts: */}
        <DashboardCharts/>
      {/* recent order tables: */}
      <CustomDataTable/>






    </div>
  )
}
