import { User } from "../../entities/User";

export interface ICreateCategoryRequestDTO{
    title: string;
    expense:boolean;
    idUser: User;
}