import express from 'express';
import { routerUser } from './User.routes';
import { routerCategory } from './Category.routes';
import { verifyToken } from '../auth';
import { routerAuth } from './Auth.routes';
import { Options } from '../config/swagger';
import { routerItem } from './Item.routes';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc(Options);



const routes = express();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes.use("/auth", routerAuth);

routes.use("/users", routerUser);

routes.use("/category",
    (req, res, next) => {
        return verifyToken.execute(req, res, next);
    },
    routerCategory);

    routes.use("/item",
    (req, res, next) => {
        return verifyToken.execute(req, res, next);
    },
    routerItem);

export default routes;