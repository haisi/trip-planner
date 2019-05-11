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

        barchart = BarChart(tripsData["Trip A"]);
    });

    const worldMap = WorldMap(trips[0].file);

    TripComponent(trips, (selectedTrip) => {
        barchart.updateValues(tripsData[selectedTrip])
    });

})();
