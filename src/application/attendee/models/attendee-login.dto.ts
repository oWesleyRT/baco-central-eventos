import { IsEmail, IsNotEmpty } from "class-validator";
import EventDTO from "src/application/event/models/event.dto";

export default class AttendeeLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}