import { IsEmail, IsNotEmpty } from "class-validator";
import EventDTO from "src/application/event/models/event.dto";

export default class AttendeeDTO {
    id?: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    bornDate: Date;
    @IsNotEmpty()
    buyer: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    password: string;
    @IsNotEmpty()
    state: string;
    @IsNotEmpty()
    city: string;
    events?: EventDTO[];
    confirmed?: string;
}