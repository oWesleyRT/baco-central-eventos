import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { AttendeeEntity } from 'src/application/attendee/entities/attendee.entity';
import { EventEntity } from './event.entity';

@Table({
    tableName: 'EventAttendeeConfirmed'
})
export class EventAttendeeConfirmedEntity extends Model {

    @ForeignKey(() => EventEntity)
    @Column
    eventId: number;

    @ForeignKey(() => AttendeeEntity)
    @Column
    attendeeId: number;
}