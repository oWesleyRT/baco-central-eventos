import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { AttendeeEntity } from 'src/application/attendee/entities/attendee.entity';
import { EventEntity } from '../entities/event.entity';

export class EventAttendeeDTO {
    eventId: number;
    attendeeId: number;
    confirmed: boolean;
}