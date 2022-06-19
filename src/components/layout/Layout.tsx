import React from 'react'
import AllCharts from '../app/allcharts'
import ChartBoard from '../app/charts'
import Header from './header/Header'

function Layout() {
  return (
    <>
    <div style={{background:'#ccc',height:'100%'}}>
    <Header/>
    <ChartBoard/>
    </div>
    </>
  )
}

export default Layout