import React, { Component } from 'react'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'

// data
import lineChartData from './data/line_chart'
import barChartData from './data/bar_chart'

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
            </div>
        );
    }
}

export default App
