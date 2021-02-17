import { Role } from "./role";

export interface User{

    id: number;
    fistName: string;
    lastName: string;
    userName: string;
    role: Role;
    token: string;
}