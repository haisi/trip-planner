// https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue
const WorldMap = (dataGeo, data) => {

    const calc = Calc();

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

    ready(dataGeo, data);

    function ready(dataGeo, data) {

        // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
        const link = data.map(row => {
            let source = [row.long1, row.lat1];
            let target = [row.long2, row.lat2];

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
            .style("stroke-width", 1);

    }
};
