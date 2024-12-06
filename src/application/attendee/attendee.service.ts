import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import AttendeeDTO from './models/attendee.dto';
import { AttendeeEntity } from './entities/attendee.entity';
import AttendeeLoginDTO from './models/attendee-login.dto';
import { EventEntity } from '../event/entities/event.entity';

@Injectable()
export class AttendeeService {

    async create(attendeeDTO: AttendeeDTO) {
        const attendeeEntity: AttendeeEntity = AttendeeEntity.toEntity(attendeeDTO);
        const existAttendee = await AttendeeEntity.findOne({
            where: {
                email: attendeeDTO.email
            },
            include: [EventEntity]
        });
        if(existAttendee){
            throw new ConflictException('E-mail already exist');
        }
        await attendeeEntity.save();
        attendeeDTO.id = attendeeEntity.id;
        return attendeeDTO;
    }

    async read(attendeeID: number): Promise<AttendeeDTO> {
        const attendeeEntity: AttendeeEntity = await AttendeeEntity.findByPk(attendeeID, {
            include: [EventEntity]
        });
        if (!attendeeEntity) {
            throw new NotFoundException(`Attendee with ID ${attendeeID} not found`);
        }
        return AttendeeEntity.toDTO(attendeeEntity);
    }

    async readEntity(attendeeID: number): Promise<AttendeeEntity> {
        const attendeeEntity: AttendeeEntity = await AttendeeEntity.findByPk(attendeeID, {
            include: [EventEntity]
        });
        if (!attendeeEntity) {
            throw new NotFoundException(`Attendee with ID ${attendeeID} not found`);
        }
        return attendeeEntity;
    }

    async readByEmail(attendeeEmail: string): Promise<AttendeeEntity> {
        const attendeeEntity: AttendeeEntity = await AttendeeEntity.findOne({
            where: {
                email: attendeeEmail
            }
        });
        return attendeeEntity;
    }

    async login(attendeeLoginDTO: AttendeeLoginDTO): Promise<AttendeeDTO> {
        const attendeeEntity: AttendeeEntity = await AttendeeEntity.findOne({
            where: {
                email: attendeeLoginDTO.email,
                password: attendeeLoginDTO.password
            },
            include: [EventEntity]
        });
        if(!attendeeEntity) {
            throw new UnauthorizedException('Invalid e-mail or password')
        }
        return AttendeeEntity.toDTO(attendeeEntity);
    }

}
