import { EventService } from './event.service';
import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import EventDTO from './models/event.dto';
import AttendeeDTO from 'src/application/attendee/models/attendee.dto';
import SubscriptionDTO from './models/subscription.dto';
import ConfirmationDTO from './models/confirmation.dto';
import { EventAttendeeDTO } from './models/event-attendee.dto';

@Controller('/v1/event')
export class EventController {

    @Inject()
    private service: EventService;

    @Post()
    async create(@Body() eventDTO: EventDTO, @Res() res): Promise<Response> {
        const event: EventDTO = await this.service.create(eventDTO);
        return res.status(HttpStatus.CREATED).json(event);
    }

    @Get(':id')
    async read(@Param('id') id: number, @Res() res): Promise<Response> {
        const event: EventDTO = await this.service.read(id);
        return res.status(HttpStatus.OK).json(event);
    }

    @Get()
    async readAll(@Res() res): Promise<Response> {
        const events: EventDTO[] = await this.service.readAll();
        return res.status(HttpStatus.OK).json(events);
    }

    @Post('/subscribe')
    async subscribe(@Body() subscriptionDTO: SubscriptionDTO, @Res() res) {
        const event: EventDTO = await this.service.subscribe(subscriptionDTO);
        return res.status(HttpStatus.CREATED).json(event);
    }

    @Post('/confirm')
    async confirm(@Body() confirmationDTO: ConfirmationDTO, @Res() res) {
        const subscription: EventAttendeeDTO = await this.service.confirm(confirmationDTO);
        return res.status(HttpStatus.CREATED).json(subscription);
    }

}
