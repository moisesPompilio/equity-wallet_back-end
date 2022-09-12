
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
const { v4: uuid } = require("uuid")

@Entity()
export class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @Column()
    title: string;

    @Column({ type: "float" })
    value: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    idUser: User;

    @ManyToOne(() => Category, { onDelete: 'CASCADE', eager: true })
    @JoinColumn()
    idCategory: Category;


    constructor(props: Omit<Item, "id">, id?: string) {
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
 *     Item:
 *       type: object
 *       required:
 *         - date
 *         - title
 *         - value
 *         - idCategory
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The Item title
 *         date:
 *           type: string
 *           description: The Item date
 *         value:
 *           type: number
 *           description: The Item value
 *         idCategory:
 *           type: number
 *           description: References a category
 *         idUser:
 *           type: number
 *           description: Automatically implemented by token
 *       example:
 *         id: a226749e-ef77-49db-a061-01102c80f076
 *         title: One BigMac
 *         date:  2022-08-27
 *         value: 12.75
 *         idCategory: d921f80d-a327-4c1d-9308-68ec8942bdee
 *         idUser: 36f90846-04bd-4b0d-9fd9-3ad12f3aeb5a
 */