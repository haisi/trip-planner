(() => { // IIFE

    const calc = Calc();

    const trips = [
        {name: "Trip A", file: "./data/trip_A_data.csv"},
        {name: "Trip B", file: "./data/trip_B_data.csv"},
    ];

    const tripsData = {
        "Trip A": {},
        "Trip B": {},
    };

    let barchart = null;
    let worldMap = null;

    const csvPromises = trips.map(trip => d3.csv(trip.file));
    const geojsonPromise = d3.json("./data/world.geojson");

    Promise.all([...csvPromises, geojsonPromise]).then(function (values) {
        let geojson = values[values.length - 1];
        let csvValues = values.slice(0, -1);

        const co2Totals = csvValues
            .map(calc.csv2Obj)
            .map(data => data.filter((it) => it.mode === 'total')[0].value);

        const distanceTotals = csvValues.map(csv => csv.reduce((acc, row) => acc + parseInt(row.distance), 0));

        let i = 0;
        for (let property in tripsData) {
            if (tripsData.hasOwnProperty(property)) {
                tripsData[property].data = values[i];
                tripsData[property].co2Total = co2Totals[i];
                tripsData[property].kmTotal = distanceTotals[i];
            }

            i++;
        }

        const maxTotal = Math.max(...co2Totals);

        barchart = BarChart(tripsData["Trip A"].data, maxTotal);
        worldMap = WorldMap(geojson, csvValues[0]);
    });


    TripComponent(trips, (selectedTrip) => {
        barchart.updateValues(tripsData[selectedTrip].data);
        worldMap.updateValues(tripsData[selectedTrip].data)
    });

})();
