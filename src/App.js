import React, { Component } from 'react'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DonutChart from './components/DonutChart'

// data
import lineChartData from './data/line_chart'
import barChartData from './data/bar_chart'
import donutChartData from './data/donut_chart'

class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <div>
                    <h2>React D3.js line chart</h2>
                    <LineChart  data={lineChartData} />
                </div>
                <div>
                    <h2>React D3.js Bar Chart</h2>
                    <BarChart data={barChartData} />
                </div>
                <div>
                    <h2>React D3.js Donut Chart</h2>
                    <DonutChart data={donutChartData} />
                </div>
            </div>
        );
    }
}

export default App
