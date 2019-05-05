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

    // https://www.d3-graph-gallery.com/graph/connectionmap_csv.html
    // The svg
    const svg = d3.select("svg#worldmap");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

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
        svg.append("g")
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
        svg.selectAll("myPath")
            .data(link)
            .enter()
            .append("path")
            .attr("d", d => path(d))
            .style("fill", "none")
            .style("stroke", d => calc.mode2color(d.mode))
            .style("stroke-width", 1)
    }

})();
