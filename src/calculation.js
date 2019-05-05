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

    return {
        mode2color : mode2color,
        distance2co2 : distance2co2,
    }
};
