import express from "express";
import getCategoriesById from "../services/categories/getCategoriesById.js";
import getCategoriesByName from "../services/categories/getCategoriesByName.js";
import createNewCategory from "../services/categories/postNewCategory.js";
import updateCategoryById from "../services/categories/updateCategory.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';


const router = express.Router();


router.get('/', (req, res) => {
    const categories = getCategoriesByName();
    res.status(200).json(categories);
}, notFoundErrorHandler);

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const categories = getCategoriesById(id);
    res.status(200).json(categories);
}, notFoundErrorHandler);

router.get('/name/:name', (req, res) => {
    const { name } = req.params;
    const categories = getCategoriesByName(name);
    res.status(200).json(categories);
}, notFoundErrorHandler);

router.post('/', authMiddleware, (req, res) => {
    const { name } = req.body;
    const newCategory = createNewCategory(name);

    res.status(201).json(newCategory);
}, notFoundErrorHandler);

router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updateCategory = updateCategoryById(id, name);
    res.status(201).json(updateCategory);
}, notFoundErrorHandler);

router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const deleteId = deleteCategory(id);
    res.status(201).json(`Category met ID: ${deleteId} is weg... voorgoed...`);
}, notFoundErrorHandler);

export default router;