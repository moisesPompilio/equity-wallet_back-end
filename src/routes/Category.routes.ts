

import { Router } from "express";
import { createCategoryController } from "../modules/CreateCategory";
import { deleteCategoryController } from "../modules/DeleteCategory";
import { getCategoryController } from "../modules/GetCategory";
import { updateCategoryController } from "../modules/UpdateCategory";

const routerCategory = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new Category
 *     tags: [Category]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category was successfully created
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 *       401:
 *         description:  Unauthorized
 */

routerCategory.post("/", (req, res) => {
    return createCategoryController.execute(req, res);
})


/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a Category
 *     required: true
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Category]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully update
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 *       401:
 *         description:  Unauthorized
 */

routerCategory.put("/:id", (req, res) => {
    return updateCategoryController.execute(req, res);
})

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns the list of all the Category
 *     tags: [Category]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       401:
 *         description:  Unauthorized
 *       200:
 *         description: The list of the Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

routerCategory.get("/", (req, res) => {
    return getCategoryController.execute(req, res);
})

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a new Category
 *     required: true
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Category]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         description: The category was successfully delete
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 *       401:
 *         description:  Unauthorized
 */

routerCategory.delete("/:id", (req, res) => {
    return deleteCategoryController.execute(req, res);
})


export { routerCategory };