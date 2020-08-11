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
    }

    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart() {
        const _self = this;
        const x = d3.scaleLinear()
                .domain([0, d3.max(_self.props.data, (d) => {return +d.x;})])
                .range([_self.margin, _self.width - _self.margin]);
        const y = d3.scaleLinear()
                .domain([0, d3.max(_self.props.data, (d) => {return +d.y;})])
                .range([_self.height - _self.margin, _self.margin]);

        const line = d3.line()
            .x((d) => {return x(d.x);})
            .y((d) => {return y(d.y);});

        const svg = d3.select(_self.node);

        svg.attr("height", _self.height)
            .attr("width", _self.width);

        svg.selectAll("path")
            .data([_self.props.data])
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => {return line(d);});

        this.renderAxes(svg, x, y);
    }

    renderAxes(svg, x, y){
        const _self = this;
        const xAxis = d3.axisBottom()
            .scale(x.range([0, (_self.width - 2 * _self.margin)]))
            .scale(x);

        const yAxis = d3.axisLeft()
            .scale(y.range([(_self.height - 2 * _self.margin), 0]))
            .scale(y);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", () => {
                const yStart = _self.height - _self.margin;
                return `translate(${_self.margin}, ${yStart})`;
            })
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", () => {
                return `translate(${_self.margin}, ${_self.margin})`;
            })
            .call(yAxis);
    }

    render() {
        return <svg ref={node => this.node = node}>
        </svg>
    }
}

export default LineChart
