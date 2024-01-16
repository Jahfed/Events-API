import express from "express";
import getUserById from "../services/users/getUserById.js";
import createNewUser from "../services/users/postNewUser.js";
import updateUserById from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
    const name = req.query.name;
    const users = getUserById("", name);
    res.status(200).json(users);
}, notFoundErrorHandler);

router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const users = getUserById(id);
    res.status(200).json(users);
}, notFoundErrorHandler);

router.post('/', authMiddleware, (req, res) => {
    const { username, password, name, image } = req.body;
    const newUser = createNewUser(username, password, name, image);

    res.status(201).json(newUser);
}, notFoundErrorHandler);

router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updateUser = updateUserById(id, username, password, name, image);
    res.status(201).json(updateUser);
}, notFoundErrorHandler);

router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const deleteId = deleteUser(id);
    res.status(201).json(`User met ID: ${deleteId} is weg... voorgoed...`);
}, notFoundErrorHandler);

export default router;