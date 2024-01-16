import express from "express";
import getEvents from "../services/events/getEvents.js";
import createNewEvent from "../services/events/postNewEvent.js";
import updateEventById from "../services/events/updateEvent.js";
import deleteEvent from "../services/events/deleteEvent.js";
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';


const router = express.Router();

router.get('/', (req, res) => {
    const { title } = req.query;
    const events = getEvents("", title);
    res.status(200).json(events);
}, notFoundErrorHandler);

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const events = getEvents(id);
    res.status(200).json(events);
}, notFoundErrorHandler);

router.post('/', authMiddleware, (req, res) => {
    const { createdBy, title, description, image, categoryIds, location, startTime, endTime } = req.body;
    console.log(req.body);
    const newEvent = createNewEvent(createdBy, title, description, image, categoryIds, location, startTime, endTime);

    res.status(201).json(newEvent);
}, notFoundErrorHandler);

router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { createdBy, title, description, image, categoryIds, location, startTime, endTime } = req.body;
    const updateEvent = updateEventById(id, createdBy, title, description, image, categoryIds, location, startTime, endTime);
    res.status(201).json(updateEvent);
}, notFoundErrorHandler);

router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const deleteId = deleteEvent(id);
    res.status(201).json(`Event met ID: ${deleteId} is weg... voorgoed...`);
}, notFoundErrorHandler);

export default router;