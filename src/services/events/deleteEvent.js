import eventData from "../../data/events.json" assert {type: "json"};
import NotFoundError from "../../errors/NotFoundErrors.js";


const deleteEvent = (id) => {
    const index = eventData.events.findIndex((event) => event.id === id);

    if (index === -1) {
        throw new NotFoundError('Event', id);
    }

    eventData.events.splice(index, 1);
    return id;
};

export default deleteEvent;