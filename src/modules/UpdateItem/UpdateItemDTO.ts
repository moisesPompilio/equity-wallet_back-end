
import { Category } from "../../entities/Category";
import { User } from "../../entities/User";

export interface IUpdateItemRequestDTO {
    id: string;
    title: string;
    value: number;
    date: Date;
    idUser: User;
    idCategory: Category;
}

