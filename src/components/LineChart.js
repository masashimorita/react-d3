import React, { Component } from 'react'
import * as d3 from 'd3';

class LineChart extends Component {
    width = 500
    height = 500
    margin = 50

    constructor(props){
        super(props);
        this.width = props.width || this.width;
        this.height = props.height || this.height;
        this.margin = props.margin || this.margin;
        this.createLineChart = this.createLineChart.bind(this);
    }

    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart() {
        const _self = this;
        const node = this.node
        const x = d3.scaleLinear()
                .domain([0, 10])
                .range([this.margin, this.width - this.margin]);
        const y = d3.scaleLinear()
                .domain([0, 10])
                .range([this.height - this.margin, this.margin]);

        d3.range(10).map((i) => {
            return {x: i, y: Math.sin(i) + 5};
        });

        const line = d3.line()
            .x((d) => {return x(d.x);})
            .y((d) => {return y(d.y);});

        const svg = d3.select(node);

        svg.attr("height", this.height)
            .attr("width", this.width);

        svg.selectAll("path")
            .data(_self.props.data)
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => {return line(d);});

        this.renderAxes(svg, x, y);
    }

    renderAxes(svg, x, y){
        const _self = this
        const xAxis = d3.axisBottom()
            .scale(x.range([0, this.quadrantWidth()]))
            .scale(x);

        const yAxis = d3.axisLeft()
            .scale(y.range([this.quadrantHeight(), 0]))
            .scale(y);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", function(){
                return `translate(${_self.xStart()}, ${_self.yStart()})`
            })
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", function(){
                return `translate(${_self.xStart()}, ${_self.yEnd()})`
            })
            .call(yAxis);
    }

    render() {
        return <svg ref={node => this.node = node}>
        </svg>
    }

    xStart(){ return this.margin;}
    yStart(){ return this.height - this.margin;}
    xEnd(){ return this.width - this.margin;}
    yEnd(){ return this.margin;}
    quadrantWidth(){ return this.width - 2 * this.margin;}
    quadrantHeight(){ return this.height - 2 * this.margin;}
}

export default LineChart
