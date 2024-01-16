import eventData from "../../data/events.json" assert {type: "json"};

const getEvents = (id, title) => {
    let events = eventData.events;

    if (!events) {
        console.log("401, error, no events available");
    }

    if (id) {
        events = events.find((event) => event.id === id);
    }

    if (title) {
        events = events.find((event) => event.title === title);
    }


    return events;
}

export default getEvents;