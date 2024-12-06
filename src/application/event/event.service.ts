import { EventAttendeeDTO } from './models/event-attendee.dto';
import { AttendeeService } from './../attendee/attendee.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EventDTO from './models/event.dto';
import { EventEntity } from './entities/event.entity';
import AttendeeDTO from '../attendee/models/attendee.dto';
import { AttendeeEntity } from '../attendee/entities/attendee.entity';
import SubscriptionDTO from './models/subscription.dto';
import ConfirmationDTO from './models/confirmation.dto';
import { EventAttendeeEntity } from './entities/event-attendee.entity';

@Injectable()
export class EventService {

    @Inject()
    private attendeeService: AttendeeService;

    async create(eventDTO: EventDTO): Promise<EventDTO> {
        const eventEntity: EventEntity = EventEntity.toEntity(eventDTO);
        await eventEntity.save();
        eventDTO.id = eventEntity.id;
        return eventDTO;
    }

    async read(id: number): Promise<EventDTO> {
        const entity: EventEntity = await EventEntity.findByPk(id, {
            include: [AttendeeEntity]
        });
        if (!entity) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        if (entity.attendees) {
            await Promise.all(entity.attendees.map(async (attendee) => {
                const subscription: EventAttendeeEntity = await EventAttendeeEntity.findOne({
                    where: {
                        eventId: id,
                        attendeeId: attendee.id
                    }
                });
                if (subscription) {
                    attendee.confirmed = subscription.confirmed;
                }
            }));
        }
        return EventEntity.toDTO(entity);
    }

    async readEntity(id: number): Promise<EventEntity> {
        const entity: EventEntity = await EventEntity.findByPk(id, {
            include: [AttendeeEntity]
        });
        if (!entity) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return entity;
    }
    
    async readAll(): Promise<EventDTO[]> {
        const entities: EventEntity[] = await EventEntity.findAll({
            include: [AttendeeEntity]
        });
        if (!entities || entities.length === 0) {
            throw new NotFoundException('No events registered');
        }
        for (const entity of entities) {
            if (entity.attendees) {
                for (const attendee of entity.attendees) {
                    const subscription: EventAttendeeEntity = await EventAttendeeEntity.findOne({
                        where: {
                            eventId: entity.id,
                            attendeeId: attendee.id
                        }
                    });
    
                    if (subscription) {
                        attendee.confirmed = subscription.confirmed;
                    }
                }
            }
        }
    
        return entities.map(entity => EventEntity.toDTO(entity));
    }

    async subscribe(subscription: SubscriptionDTO): Promise<EventDTO> {
        const event: EventEntity = await this.readEntity(subscription.eventId);
        let attendeeExist: AttendeeEntity = await this.attendeeService.readByEmail(subscription.attendee.email);
        if (!attendeeExist) {
            const attendeeDTO: AttendeeDTO = await this.attendeeService.create(subscription.attendee);
            attendeeExist = await this.attendeeService.readEntity(attendeeDTO.id);
        }
        await event.$add('attendee', attendeeExist);
        await event.save();
        return EventEntity.toDTO(event);
    }

    async confirm(confirmation: ConfirmationDTO): Promise<EventAttendeeDTO> {
        const subscription: EventAttendeeEntity = await EventAttendeeEntity.findOne({
            where: {
                eventId: confirmation.eventId,
                attendeeId: confirmation.attendeeId
            }
        });
        if(!subscription) {
            throw new NotFoundException('Attendee isn\'t subscribe on this Event')
        }
        subscription.confirmed = true;
        await subscription.save();
        return EventAttendeeEntity.toDTO(subscription);
    }
}
