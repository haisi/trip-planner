(() => { // IIFE

    const calc = Calc();

    // TODO add radio button change listener
    // TODO update the paths
    // TODO update the co2 bar-chart
    const trips = [
        {name: "Trip A", file: "./data/data_connectionmap.csv"},
        {name: "Trip B", file: "./data/data_connectionmap.csv"},
    ];

    const tripComp = TripComponent(trips, () => {});

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

    const goals = [
        {mode: 'car', value: 10},
        {mode: 'train', value: 20},
        {mode: 'plane', value: 30},
        {mode: 'total', value: 60},
    ];

    chart.selectAll()
        .data(goals)
        .enter()
        .append('rect')
        .attr('x', (s) => xScale(s.mode))
        .attr('y', (s) => yScale(s.value))
        .attr('height', (s) => chart_height - yScale(s.value))
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


    // https://www.d3-graph-gallery.com/graph/connectionmap_csv.html
    // The svg
    const worldmapSvg = d3.select("svg#worldmap");
    const width = +worldmapSvg.attr("width");
    const height = +worldmapSvg.attr("height");

    // Map and projection
    const projection = d3.geoMercator()
        .scale(85)
        .translate([width / 2, height / 2 * 1.3]);

    // A path generator
    const path = d3.geoPath()
        .projection(projection);

    // Load world shape AND list of connection
    d3.queue()
        .defer(d3.json, "./data/world.geojson")  // World shape
        .defer(d3.csv, trips[0].file) // Position of circles
        .await(ready);

    function ready(error, dataGeo, data) {

        const co2stats = {
          train: 0,
          car: 0,
          plane: 0
        };

        // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
        const link = data.map(row => {
            let source = [row.long1, row.lat1];
            let target = [row.long2, row.lat2];

            co2stats[row.mode] += calc.distance2co2(row.mode, row.distance);

            return {type: "LineString", coordinates: [source, target], mode: row.mode};
        });

        // Draw the map
        worldmapSvg.append("g")
            .selectAll("path")
            .data(dataGeo.features)
            .enter().append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
            .style("stroke-width", 0);

        // Add the path
        worldmapSvg.selectAll("myPath")
            .data(link)
            .enter()
            .append("path")
            .attr("d", d => path(d))
            .style("fill", "none")
            .style("stroke", d => calc.mode2color(d.mode))
            .style("stroke-width", 1)
    }

})();
