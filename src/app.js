(() => { // IIFE

    // TODO update the paths
    // TODO update the co2 bar-chart
    const trips = [
        {name: "Trip A", file: "./data/trip_A_data.csv"},
        {name: "Trip B", file: "./data/trip_B_data.csv"},
    ];

    TripComponent(trips, (selectedTrip) => {
        console.log(selectedTrip);
    });

    const barChartData = [
        {mode: 'car', value: 10},
        {mode: 'train', value: 20},
        {mode: 'plane', value: 30},
        {mode: 'total', value: 60},
    ];

    const barChartData2 = [
        {mode: 'car', value: 20},
        {mode: 'train', value: 30},
        {mode: 'plane', value: 10},
        {mode: 'total', value: 80},
    ];

    const barchart = BarChart(barChartData, barChartData2);
    const worldMap = WorldMap(trips[0].file);


})();
