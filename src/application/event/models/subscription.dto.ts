import { IsNotEmpty } from "class-validator";
import AttendeeDTO from "src/application/attendee/models/attendee.dto";

export default class SubscriptionDTO {
    @IsNotEmpty()
    attendee: AttendeeDTO
    @IsNotEmpty()
    eventId: number
}