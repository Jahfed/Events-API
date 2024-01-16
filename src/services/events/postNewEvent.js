import { v4 as uuid } from "uuid";
import eventData from "../../data/events.json" assert {type: "json"};

const createEvent = (createdBy, title, description, image, categoryIds, location, startTime, endTime) => {
    const newEvent = {
        id: uuid(),
        createdBy, title, description, image, categoryIds, location, startTime, endTime
    };

    eventData.events.push(newEvent);
    return newEvent;
}

export default createEvent;