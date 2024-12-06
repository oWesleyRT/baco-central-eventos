import { IsEmail, IsNotEmpty } from "class-validator";

export default class AgentLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}