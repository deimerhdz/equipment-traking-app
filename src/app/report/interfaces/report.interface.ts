import { User } from '../../auth/interfaces/user';
import { Equipment } from '../../equipment/interface/equipment.interface';
export interface Report{
    description:string;
    equipmentId:Equipment;
    userId:User;
    creationDate:Date;
    _id?:string
}