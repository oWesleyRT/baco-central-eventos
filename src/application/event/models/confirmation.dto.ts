import { IsNotEmpty } from "class-validator";
import AttendeeDTO from "src/application/attendee/models/attendee.dto";

export default class ConfirmationDTO {
    @IsNotEmpty()
    attendeeId: number
    @IsNotEmpty()
    eventId: number
}