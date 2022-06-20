import React, {useContext, useState} from 'react'
import PoSummary from './chart2/PoSummary'
import PieChart from './chart2/pieChart'
import BuSpend from './chart2/BuSpend'
import DonutChart from './chart2/DonutChart'
import BarChart from './chart2/BarChart'
import Dialog from '../Dialog'
import './index.css'
import GraphsContext from '../../../context'

function ChartBoard() {
    
    const {hidden,changeView, graphsList} = useContext(GraphsContext)
    console.log(graphsList)

    return (<>
        <div className='container'>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{hidden ? null : <Dialog />}
                {hidden ? <button className='dialog-btn' onClick={changeView}>
                    Dialog
                </button> : null}</div>

            <div className='row' >
                {graphsList.includes("PoSummary") && <PoSummary />}
                {graphsList.includes("PieChart") && <PieChart />}
                {graphsList.includes("BuSpend") && <BuSpend />}
          
            {graphsList.includes("DonutChart") && <DonutChart />}
            {graphsList.includes("BarChart") && <BarChart />}
            </div>
            
            <br />
        </div>
    </>
    )
}

export default ChartBoard 