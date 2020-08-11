import React, { Component } from 'react'
import * as d3 from 'd3';

class DonutChart extends Component {
    width = 500;
    height = 500;
    margin = 50;
    radius = 0;

    constructor(props) {
        super(props);
        this.width = props.width || this.width;
        this.height = props.height || this.height;
        this.margin = props.margin || this.margin;
        this.radius = Math.min(this.width, this.height) / 2 - this.margin
    }

    componentDidMount() {
        this.createDonutChart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.createDonutChart()
    }

    createDonutChart () {
        const _self = this;

        const color = d3.scaleOrdinal()
            .domain(_self.props.data.map(d => d.label))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), _self.props.data.length).reverse())
        const pie = d3.pie()
            .value(function(d) {return d.value; })
        const arc = d3.arc()
            .innerRadius(100)
            .outerRadius(this.radius)
        const pieData = pie(_self.props.data)

        const svg = d3.select(this.node)
            .attr("width", _self.width)
            .attr("height", _self.height)
            .append("g")
            .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);

        svg.selectAll("whatever")
            .data(pieData)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.label))
            .attr("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", 0.7)
            .append("title")
            .text(d => d.data.label);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(pieData)
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.6em")
                .attr("font-weight", "bold")
                .text(d => d.data.label))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString()));
    }

    render() {
        return <svg ref={node => this.node = node}/>
    }
}
export default DonutChart
