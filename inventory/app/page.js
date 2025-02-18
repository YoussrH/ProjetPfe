import React from 'react'
import Hero from './components/Hero/page'
import New from './components/NewProd/page'
import AllTimeProducts from './components/Alltimeproduct/page'
import SaleBanner from './components/SaleBanner/page'
import Header from './components/Header/page'

export default function Home() {
  return (
    <div >
   
      {/*Hero */}
      <Hero/>
      {/*New product*/}
      <New/>
      {/*All products*/}
      <AllTimeProducts/>
      {/*scroller*/}
      <SaleBanner/>
    
    </div>
    
  )
}
