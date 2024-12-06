import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { AttendeeEntity } from 'src/application/attendee/entities/attendee.entity';
import { EventEntity } from './event.entity';
import { EventAttendeeDTO } from '../models/event-attendee.dto';

@Table({
    tableName: 'EventAttendee'
})
export class EventAttendeeEntity extends Model {

    @ForeignKey(() => EventEntity)
    @Column
    eventId: number;

    @ForeignKey(() => AttendeeEntity)
    @Column
    attendeeId: number;

    @Column({
        defaultValue: false
    })
    confirmed: boolean;

    static toEntity(dto: EventAttendeeDTO): EventAttendeeEntity {
        let entity: EventAttendeeEntity = new EventAttendeeEntity();
        entity.attendeeId = dto.attendeeId;
        entity.eventId = dto.eventId;
        entity.confirmed = dto.confirmed;

        return entity;
    }

    static toDTO(entity: EventAttendeeEntity): EventAttendeeDTO {
        let dto: EventAttendeeDTO = new EventAttendeeDTO();
        dto.attendeeId = entity.attendeeId;
        dto.eventId = entity.eventId;
        dto.confirmed = entity.confirmed;

        return dto;
    }
}