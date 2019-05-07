(() => { // IIFE

    // TODO add radio button change listener
    // TODO update the paths
    // TODO update the co2 bar-chart
    const trips = [
        {name: "Trip A", file: "./data/data_connectionmap.csv"},
        {name: "Trip B", file: "./data/data_connectionmap.csv"},
    ];

    const tripComp = TripComponent(trips, () => {});

    const barChartData = [
        {mode: 'car', value: 10},
        {mode: 'train', value: 20},
        {mode: 'plane', value: 30},
        {mode: 'total', value: 60},
    ];

    const barchart = BarChart(barChartData);
    const worldMap = WorldMap(trips[0].file);


})();
