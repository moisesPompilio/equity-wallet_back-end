
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";
const { v4: uuid } = require("uuid")

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    expense: boolean;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    idUser: User;
   
    @OneToMany(() => Item, items => items.idCategory)
    items?: Item[];

    constructor(props: Omit<Category, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }else{
            this.id = id;
        }
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *         - expense
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Category
 *         idUser:
 *           type: string
 *           description: Automatically implemented by token
 *         expense:
 *           type: string
 *           description: The category expense
 *         title:
 *           type: string
 *           description: The category title
 *       example:
 *         id: a226749e-ef77-49db-a061-01102c80f076
 *         title: food
 *         expense: true
 *         idUser: 36f90846-04bd-4b0d-9fd9-3ad12f3aeb5a
 */