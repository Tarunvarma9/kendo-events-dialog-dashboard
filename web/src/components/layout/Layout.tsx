import React from 'react'

import ChartBoard from '../app/charts'
import Header from './header/Header'
import { GraphsProvider } from '../../context'


function Layout() {
  return (
    <>
      <div style={{ background: ' rgba(0,0,0,0.9)', height: '100%' }}>
        <GraphsProvider>
          <Header />
          <div style={{padding:'0px 3%'}}>
          <ChartBoard />
          </div>
        </GraphsProvider>
      </div>
    </>
  )
}

export default Layout