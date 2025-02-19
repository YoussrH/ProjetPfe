import AutoSlider from '@/app/components/AutoSlider/page'
import FeaturesSection from '@/app/components/Footer/FeaturesSection'
import Hero from '@/app/components/Hero/page'
import Collection from '@/app/components/NewProd/collection'
import NewProd from '@/app/components/NewProd/page'
import Produit from '@/app/components/Prod/page'
import React from 'react'

export default function Accueil() {
  return (
        
   <div>
       {/*Hero */}
       <AutoSlider/>
      <Hero/>
      {/* product*/}
      <Produit/>
      {/*New products*/}
      <NewProd/>
      {/*collections*/}
      <Collection/>

      {/*scroller*/}
        <FeaturesSection/>
{/*       <SaleBanner/>
 */}
   </div>
  )
}
