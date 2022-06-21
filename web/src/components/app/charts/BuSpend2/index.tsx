import * as React from "react";
import * as ReactDOM from "react-dom";
import { Loader } from "@progress/kendo-react-indicators";


import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartLegend,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
} from "@progress/kendo-react-charts";

// const data = [360000000, 110000000, 100000000, 25000000, 15000000, 10000000];
// const categories = ["VRePL ", "Woxen", "WTC", "Karka", "Chaitanya", "BEEN"];

const BuSpend2 = () => {
    const [buSpendData, setBuSpendData] = React.useState<any>([])
    const [buSpendCategory, setBuSpendCategory] = React.useState<any>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const headers = {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const url = "http://localhost:8000/effigo/api/dashboard/BuSpend"
        const fetchData = async () => {
            const data = await fetch(url, headers);
            const json = await data.json();
            let data1 = []
            let data2: string[] = []
            for (let li of json) {
                console.log(li)
                data1.push(li[0])
                data2.push(li[1])
            }
            setBuSpendCategory(data1)
            setBuSpendData(data2)
            setLoading(false)


        }
        fetchData()
    }, [])
    return (
        <div className="col-4">
            {loading ? <><Loader size="large" type={"infinite-spinner"} /></> : <><div className="k-card">
                <Chart style={{ height: "250px" }}>
                    <ChartTitle text="BU Spend" />
                    <ChartLegend position="bottom" orientation="horizontal" />
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={buSpendCategory} startAngle={45} labels={{ rotation: 0 }} />
                    </ChartCategoryAxis>
                    <ChartSeries>
                        <ChartSeriesItem data={buSpendData} name="BU Spend" />
                    </ChartSeries>
                </Chart>
            </div></>}
        </div>
    )
};

export default BuSpend2;
