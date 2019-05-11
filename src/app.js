(() => { // IIFE

    // TODO update the paths
    const trips = [
        {name: "Trip A", file: "./data/trip_A_data.csv"},
        {name: "Trip B", file: "./data/trip_B_data.csv"},
    ];

    const tripsData = {
        "Trip A" : null,
        "Trip B" : null,
    };

    let barchart = null;
    let worldMap = null;

    const csvPromises = trips.map(trip => d3.csv(trip.file));
    const geojsonPromise = d3.json("./data/world.geojson");

    Promise.all([...csvPromises, geojsonPromise]).then(function(values) {
        let i = 0;
        for (let property in tripsData) {
            if (tripsData.hasOwnProperty(property)) {
                tripsData[property] = values[i];
            }

            i++;
        }

        let geojson = values[values.length - 1];

        barchart = BarChart(tripsData["Trip A"]);
        worldMap = WorldMap(geojson, values[0]);
    });


    TripComponent(trips, (selectedTrip) => {
        barchart.updateValues(tripsData[selectedTrip]);
        worldMap.updateValues(tripsData[selectedTrip])
    });

})();
