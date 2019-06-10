const ItineraryComponent = () => {
    const htmlList = document.getElementById("itinerary-list");

    const planeEmoji = '✈';
    const trainEmoji = '🚆';
    const busEmoji = '🚌';

    const update = (data) => {
        htmlList.innerHTML = '';

        data.forEach(trip => {
            const listItem = document.createElement("LI");

            let emoji;
            switch (trip.mode) {
                case "car":
                    emoji = busEmoji;
                    break;
                case "train":
                    emoji = trainEmoji;
                    break;
                case "plane":
                    emoji = planeEmoji;
                    break;
            }

            listItem.innerText = `${trip.comment} in ${trip.distance} kms by ${emoji}`;
            htmlList.appendChild(listItem);
        });
    };

    return {
        "update": update
    }
};
