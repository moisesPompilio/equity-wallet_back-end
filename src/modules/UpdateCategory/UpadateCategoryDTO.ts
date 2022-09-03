import { User } from "../../entities/User";

export interface IUpdateCategoryRequestDTO{
    id: string;
    title: string;
    expense:boolean;
    idUser: User;
}