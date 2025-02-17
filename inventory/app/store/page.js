import React from 'react'
import Header from '../components/Header/page'
import Hero from '../components/Hero/page'
import New from '../components/NewProd/page'
import AllTimeProducts from '../components/Alltimeproduct/page'
import Footer from '../components/Footer/page'
import SaleBanner from '../components/SaleBanner/page'
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
