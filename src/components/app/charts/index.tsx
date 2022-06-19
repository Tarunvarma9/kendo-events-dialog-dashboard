import React, { useEffect, useState } from 'react'
import BuSpend2 from './BuSpend2/index'
import CatalogSpend from './CataLogSpend/index'
import CategorySpend2 from './CategorySpend2/index'
import PoSummary2 from './PoSummary2/index'
import {AiFillHome} from 'react-icons/ai'
import PoSummary from './chart2/PoSummary'
import PieChart from './chart2/pieChart'
import BuSpend from './chart2/BuSpend'
import DonutChart from './chart2/DonutChart'
import BarChart from './chart2/BarChart'

import { Link } from 'react-router-dom'
import Dialog from '../Dialog'
import './index.css'

function ChartBoard() {
    const [hidden, setHidden] = useState(true);
    
    return (<>
        <div className='container'>
        <div style={{display:'flex',justifyContent:'flex-end'}}>{hidden ? null : <Dialog/>}
 {hidden? <button className='dialog-btn' onClick={() => setHidden(s => !s)}>
 Dialog 
 </button> : null}</div>

            <div className='row'>
                <PoSummary />
                <PieChart />
                <BuSpend />
            </div>
            <div className='row'>
                <PieChart />
                <DonutChart/>
                <BarChart/>
            </div>
            <br/>
        </div>
        </>
    )
}

export default ChartBoard 