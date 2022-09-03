import { Category } from "../../entities/Category";
import { User } from "../../entities/User";

export interface ICreateItemRequestDTO {
    title: string;
    value: number;
    date: Date;
    idUser: User;
    idCategory: Category;
}