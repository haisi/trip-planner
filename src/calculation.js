const Calc = () => {
    // @formatter:off
    const mode2color = (mode) => {
        switch (mode) {
            case "plane": return "#b32b22";
            case "car": return "#69b3a2";
            case "train": return "#002ab3";
        }
    };

    const distance2co2 = (mode, distance) => {
        switch (mode) {
            case "plane": return distance * 244.09;
            case "car": return distance * 101.61;
            case "train": return distance * 28.39;
        }
    };
    // @formatter:on

    const transform = (csvData) => {
        const co2stats = {
            train: 0,
            car: 0,
            plane: 0,
        };

        csvData.map(row => {
            co2stats[row.mode] += distance2co2(row.mode, row.distance);
        });

        return [
            {mode: 'car', value: co2stats.car},
            {mode: 'train', value: co2stats.train},
            {mode: 'plane', value: co2stats.plane},
            {mode: 'total', value: co2stats.car + co2stats.plane + co2stats.train},
        ];
    };

    return {
        mode2color : mode2color,
        distance2co2 : distance2co2,
        csv2Obj : transform,
    }
};
