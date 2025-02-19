import React from 'react'
import ScrollToTop from './components/DynamicHeader/ScrollToTop'
import Accueil from './store/Home/page'

export default function Home() {
  return (
    <div >
      <Accueil/>
      <ScrollToTop />
    </div>
    
  )
}
