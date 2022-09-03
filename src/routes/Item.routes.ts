import { Router } from "express";
import { createItemController } from "../modules/CreateItem";
import { deleteItemController } from "../modules/DeleteItem";
import { getItemController } from "../modules/GetItem";
import { updateItemController } from "../modules/UpdateItem";

const routerItem = Router();


/**
 * @swagger
 * /item:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 *       401:
 *         description:  Unauthorized
 */

routerItem.post("/", (req, res) => {
    return createItemController.execute(req, res);
})


/**
 * @swagger
 * /item:
 *   get:
 *     summary: Returns the list of all the Item
 *     tags: [Item]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       401:
 *         description:  Unauthorized
 *       200:
 *         description: The list of the Item
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
routerItem.get("/", (req, res) => {
    return getItemController.execute(req, res);
})

/**
* @swagger
* /item/{id}:
*   put:
*     summary: Upadate Item
*     required: true
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*     tags: [Item]
*     security: [{bearerAuth: []}]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Item'
*     responses:
*       200:
*         description: The Item was successfully update
*       500:
*         description: Some server error
*       400:
*         description: The request error
*       401:
*         description:  Unauthorized
*/

routerItem.put("/:id", (req, res) => {
    return updateItemController.execute(req, res);
})

/**
* @swagger
* /item/{id}:
*   delete:
*     summary: delete Item
*     required: true
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*     tags: [Item]
*     security: [{bearerAuth: []}]
*     responses:
*       200:
*         description: The Item was successfully delete
*       500:
*         description: Some server error
*       400:
*         description: The request error
*       401:
*         description:  Unauthorized
*/

routerItem.delete("/:id", (req, res) => {
    return deleteItemController.execute(req, res);
})


export { routerItem };