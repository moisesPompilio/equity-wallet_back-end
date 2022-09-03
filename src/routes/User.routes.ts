import { Router } from "express";
import { verifyToken } from "../auth";
import { createUserController } from "../modules/CreateUser";
import { deleteUserController } from "../modules/DeleteUser";
import { getUserController } from "../modules/GetUser";
import { loginUserController } from "../modules/Login";
import { updateUserController } from "../modules/UpdateUser";

/**
 * @swagger
 * tags:
 * name: User
 * description: The users managin API
 */

const routerUser = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */

routerUser.post("/", (req, res) => {
    return createUserController.handle(req, res);
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Token'
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */
routerUser.post("/login", (req, res) => {
    return loginUserController.execute(req, res);
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the User
 *     tags: [User]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       401:
 *         description:  Unauthorized
 *       200:
 *         description: The get user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
routerUser.get("/",
    (req, res, next) => {
        return verifyToken.execute(req, res, next);
    },
    (req, res) => {
        return getUserController.execute(req, res);
    })

/**
* @swagger
* /users:
*   put:
*     summary: Upadate User
*     required: true
*     tags: [User]
*     security: [{bearerAuth: []}]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The User was successfully update
*       500:
*         description: Some server error
*       400:
*         description: The request error
*       401:
*         description:  Unauthorized
*/

routerUser.put("/",
    (req, res, next) => {
        return verifyToken.execute(req, res, next);
    },
    (req, res) => {
        return updateUserController.execute(req, res);
    })


/**
* @swagger
* /users:
*   delete:
*     summary: Returns the User
*     tags: [User]
*     security: [{bearerAuth: []}]
*     responses:
*       401:
*         description:  Unauthorized
*       200:
*         description: The delete User
*/
routerUser.delete("/",
    (req, res, next) => {
        return verifyToken.execute(req, res, next);
    },
    (req, res) => {
        return deleteUserController.execute(req, res);
    })

export { routerUser };