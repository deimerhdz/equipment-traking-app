import { User } from "../../auth/interfaces/user";

export interface Equipment{
    name:string
    _id?:string
    description:string;
    photo:string;
    category:string;
    stock:number;
    user:User
}