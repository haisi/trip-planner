// https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue
const WorldMap = (dataGeo, data) => {

    const calc = Calc();

    // Define the div for the tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

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

    // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
    const link = data.map(row => {
        let source = [row.long1, row.lat1];
        let target = [row.long2, row.lat2];

        return {type: "LineString", coordinates: [source, target], mode: row.mode, comment: row.comment};
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
    let myPath = worldmapSvg.selectAll("myPath")
        .data(link)
        .enter()
        .append("path")
        .attr("class", "meinPfad")
        .attr("d", d => path(d))
        .attr('pointer-events', 'visibleStroke')
        .attr('title', d => d.comment)
        .attr('alt', d => d.comment)
        .style("fill", "none")
        .style("stroke", d => calc.mode2color(d.mode))
        .style("stroke-width", 1)
        .style("cursor", "pointer")
        // .on("click", d => {
        .on("mouseover", d => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d.comment)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", d => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    return {
        updateValues: (csvData) => {
            const link = csvData.map(row => {
                let source = [row.long1, row.lat1];
                let target = [row.long2, row.lat2];
                return {type: "LineString", coordinates: [source, target], mode: row.mode, comment: row.comment};
            });

            let pfad = worldmapSvg.selectAll("myPath")
                .data(link);

            pfad.exit().remove();

            d3.selectAll(".meinPfad").remove();

            pfad.enter()
                .append("path")
                .attr("class", "meinPfad")
                .attr("d", d => path(d))
                .attr('pointer-events', 'visibleStroke')
                .attr('title', d => d.comment)
                .attr('alt', d => d.comment)
                .style("fill", "none")
                .style("stroke", d => calc.mode2color(d.mode))
                .style("stroke-width", 1)
                .style("cursor", "pointer")
                // .on("click", d => {
                .on("mouseover", d => {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(d.comment)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", d => {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        }
    }
};
