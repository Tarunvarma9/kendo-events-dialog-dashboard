import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {AiFillHome} from 'react-icons/ai'


import {
 Chart,
 ChartLegend,
 ChartLegendTitle,
 ChartSeries,
 ChartSeriesItem,
 ChartTitle,
 ChartCategoryAxis,
 ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

import 'hammerjs';
import { Link } from 'react-router-dom';
interface dataItem {
 name: string,
 data: number[]
}

const linearDataMonth = {
 name: 'PO COUNT',
 data: [100, 160, 205, 135, 165, 108, 150]
}
const MonthData = [
 "Jan",
 "Apr",
 "Feb",
 "Mar",
 "May",
 "Jun",
 "Dec",
]

const legend = { position: 'bottom', orientation: "vertical", labels: { font: '.95em Roboto, Arial, sans-serif' } };


const LineChart = () => (
  <>


 <div style={{ width: "600px" }}>

 <Chart>
 <ChartTitle text="PO SUMMARY" font='1.06em Roboto, Arial, sans-serif' color="#000000" />
 <ChartLegend {...legend}>

 </ChartLegend>
 <ChartSeries>
 <ChartSeriesItem name={linearDataMonth?.name} data={linearDataMonth?.data} type="line" tooltip={{ visible: true }} />
 </ChartSeries>
 <ChartCategoryAxis>
 <ChartCategoryAxisItem categories={MonthData} />
 </ChartCategoryAxis>
 </Chart>
 </div>
 </>
);

export default LineChart