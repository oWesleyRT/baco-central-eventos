import { IsEmail, IsNotEmpty } from "class-validator";

export default class AgentDTO {
    id?: number;
    @IsNotEmpty()
    name: string;
    password: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}