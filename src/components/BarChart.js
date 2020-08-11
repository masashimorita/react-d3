import React, { Component } from 'react'
import * as d3 from 'd3';

class BarChart extends Component {
    width = 500;
    height = 500;
    margin = 50;
    barMargin = 2;

    constructor(props) {
        super(props);
        this.width = props.width || this.width;
        this.height = props.height || this.height;
        this.margin = props.margin || this.margin;
        this.barMargin = props.barMargin || this.barMargin;
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.createBarChart()
    }

    createBarChart() {
        const _self = this;
        const barWidth = Math.round((_self.width - _self.margin * 2) / _self.props.data.length);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(_self.props.data)])
            .range([0, _self.height - _self.margin * 2]);

        const svg = d3.select(_self.node)
            .attr("width", _self.width)
            .attr("height", _self.height);

        svg.selectAll("rect")
            .data(_self.props.data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return _self.margin + i * barWidth;
            })
            .attr("y", (d) => {
                return _self.height - _self.margin - yScale(d);
            })
            .attr("width", (d) => {return barWidth - _self.barMargin;})
            .attr("height", (d) => {return yScale(d);})
            .attr("fill", "steelblue");

        this.renderAxes(svg);
    }

    renderAxes(svg) {
        const _self = this;
        const axisScale = d3.scaleLinear()
            .domain([0, d3.max(_self.props.data)])
            .range([_self.height - _self.margin, _self.margin]);

        const yAxis = d3.axisLeft()
            .scale(axisScale);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", () => {
                return `translate(${_self.margin}, 0)`;
            })
            .call(yAxis);
    }

    render() {
        return <svg ref={node => this.node = node}/>
    }
}
export default BarChart
