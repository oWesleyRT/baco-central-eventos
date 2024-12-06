import { IsNotEmpty } from "class-validator";
import AttendeeDTO from "src/application/attendee/models/attendee.dto";

export default class EventDTO {
    id?: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    date: Date;
    @IsNotEmpty()
    days: number;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    state: string;
    maxAttendees: number;
    attendees?: AttendeeDTO[];
    attendeesConfirmed?: AttendeeDTO[];
}