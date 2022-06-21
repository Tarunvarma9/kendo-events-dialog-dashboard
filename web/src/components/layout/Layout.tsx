import React from 'react'

import ChartBoard from '../app/charts'
import Header from './header/Header'
import { GraphsProvider } from '../../context'


function Layout() {
  return (
    <>
      <div style={{ background: '#ccc', height: '100%' }}>
        <GraphsProvider>
          <Header />
          <ChartBoard />
        </GraphsProvider>
      </div>
    </>
  )
}

export default Layout