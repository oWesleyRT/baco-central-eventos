import { AutoIncrement, BelongsToMany, Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import AttendeeDTO from '../models/attendee.dto';
import { EventAttendeeEntity } from 'src/application/event/entities/event-attendee.entity';
import { EventEntity } from 'src/application/event/entities/event.entity';
import { EventAttendeeConfirmedEntity } from 'src/application/event/entities/event-attendee-confirmed.entity';

@Table({
    tableName: 'attendees'
})
export class AttendeeEntity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number
    @Column
    name: string;
    @Column
    bornDate: Date;
    @Column
    buyer: string;
    @Column({
        unique: true
    })
    email: string;
    @Column({
        defaultValue: 'password123'
    })
    password: string;
    @Column
    state: string;
    @Column
    city: string;
    @BelongsToMany(() => EventEntity, () => EventAttendeeEntity)
    events: EventEntity[];
    confirmed?: boolean;

    static toEntity(dto: AttendeeDTO): AttendeeEntity {
        const entity: AttendeeEntity = new AttendeeEntity();
        entity.name = dto.name;
        entity.bornDate = dto.bornDate;
        entity.buyer = dto.buyer;
        entity.email = dto.email;
        entity.state = dto.state;
        entity.city = dto.city;
        entity.events = dto.events ? dto.events.map(event => EventEntity.toEntity(event)) : [];
        return entity;
    }

    static toDTO(entity: AttendeeEntity): AttendeeDTO {
        let dto: AttendeeDTO = new AttendeeDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.bornDate = entity.bornDate;
        dto.buyer = entity.buyer;
        dto.email = entity.email;
        dto.password = entity.password;
        dto.state = entity.state;
        dto.city = entity.city;
        dto.events = entity.events ? entity.events.map(event => EventEntity.toDTO(event)) : [];
        dto.confirmed = entity.confirmed ? 'Sim' : 'Não';
        return dto;
    }
}