import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Item } from "./Item";
const { v4: uuid } = require("uuid");

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Item, items => items.idUser)
    items?: Item[];

    @OneToMany(() => Category, category => category.idUser)
    categories?: Category[];

    constructor(props: Omit<User, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        } else {
            this.id = id;
        }
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: a226749e-ef77-49db-a061-01102c80f076
 *         name: rogerinho
 *         email: rogernho26@gmail.com
 *         password: 12345
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The Login email
 *         password:
 *           type: string
 *           description: The Login password
 *       example:
 *         email: rogernho26@gmail.com
 *         password: 12345
 */