const TripComponent = (trips, onChangeListener) => {

    const fieldset = document.getElementById("itinerary-selector");

    trips.map((trip, idx) => {
        // <input type="radio" checked="checked" id="itA" name="ItinerarySelection" value="Trip A">
        // <label for="itA">Trip A</label>
        const radio = document.createElement("INPUT");
        radio.type = "radio";
        radio.name = "ItinerarySelection";
        radio.value = trip.name;
        const id = "trip" + idx;
        radio.id = id;

        if (idx === 0) {
            radio.checked = "checked";
        }

        const label = document.createElement("LABEL");
        const for_attr = document.createAttribute("for");
        for_attr.value = id;
        label.setAttributeNode(for_attr);
        label.appendChild(document.createTextNode(trip.name));

        fieldset.appendChild(radio);
        fieldset.appendChild(label);
    });


};
