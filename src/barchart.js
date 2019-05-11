const BarChart = (data, data2) => {
    const calc = Calc();

    // https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
    const co2Chart = d3.select("svg#co2Chart");
    const margin = 60;
    const chart_width = 500 - 2 * margin;
    const chart_height = 300 - 2 * margin;
    const chart = co2Chart.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
    const yScale = d3.scaleLinear()
        .range([chart_height, 0])
        .domain([0, 100]);
    chart.append('g')
        .call(d3.axisLeft(yScale));
    const xScale = d3.scaleBand()
        .range([0, chart_width])
        .domain(['car', 'train', 'plane', 'total'])
        .padding(0.2);

    chart.append('g')
        .attr('transform', `translate(0, ${chart_height})`)
        .call(d3.axisBottom(xScale));

    const bars = chart.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (s) => xScale(s.mode))
        .attr('y', (s) => yScale(s.value))
        .attr('height', (s) => chart_height - yScale(s.value))
        .style("fill", d => calc.mode2color(d.mode))
        .attr('width', xScale.bandwidth());

    // Add lines
    chart.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${chart_height})`)
        .call(d3.axisBottom()
            .scale(xScale)
            .tickSize(-chart_height, 0, 0)
            .tickFormat(''));

    chart.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft()
            .scale(yScale)
            .tickSize(-chart_width, 0, 0)
            .tickFormat(''));

    // labels
    co2Chart.append('text')
        .attr('x', -(chart_height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('CO2 emissions in grams');

    co2Chart.append('text')
        .attr('x', chart_width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('co2 output by mode of transportation');


};
