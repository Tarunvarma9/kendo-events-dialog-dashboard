import React from 'react'
import AllCharts from '../app/allcharts'
import Header from './header/Header'

function Layout() {
  return (
    <>
    <div style={{background:'ghostwhite',height:'100vh'}}>
    <Header/>
    <br/>
    <AllCharts/>
    </div>
    </>
  )
}

export default Layout