import { TUser } from "@/types/user.type";

export interface IUserFormState extends Omit<TUser, 'id'>{
    password?: string
}

export type TypeUserForm = 'create' | 'edit' | 'update-profile'