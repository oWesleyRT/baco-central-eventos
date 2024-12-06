import { AutoIncrement, BelongsToMany, Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { AttendeeEntity } from 'src/application/attendee/entities/attendee.entity';
import { EventAttendeeEntity } from './event-attendee.entity';
import EventDTO from '../models/event.dto';
import { EventAttendeeConfirmedEntity } from './event-attendee-confirmed.entity';

@Table({
    tableName: 'events'
})
export class EventEntity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column
    name: string;
    @Column
    date: Date;
    @Column
    days: number;
    @Column
    address: string;
    @Column
    city: string;
    @Column
    state: string;
    @Column({
        defaultValue: 500
    })
    maxAttendees: number;
    @BelongsToMany(() => AttendeeEntity, () => EventAttendeeEntity)
    attendees: AttendeeEntity[];

    static toEntity(dto: EventDTO): EventEntity {
        let entity: EventEntity = new EventEntity();
        entity.name = dto.name;
        entity.date = dto.date;
        entity.days = dto.days;
        entity.address = dto.address;
        entity.city = dto.city;
        entity.state = dto.state;
        entity.maxAttendees = dto.maxAttendees;

        return entity;
    }

    static toDTO(entity: EventEntity): EventDTO {
        let dto: EventDTO = new EventDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.date = entity.date;
        dto.days = entity.days;
        dto.address = entity.address;
        dto.city = entity.city;
        dto.state = entity.state;
        dto.maxAttendees = entity.maxAttendees;
        dto.attendees = entity.attendees ? entity.attendees.map(attendee => AttendeeEntity.toDTO(attendee)) : [];
        // dto.attendeesConfirmed = entity.attendeesConfirmed.map(attendee => AttendeeEntity.toDTO(attendee));
        return dto;
    }
}