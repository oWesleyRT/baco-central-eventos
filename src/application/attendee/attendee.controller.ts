import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import AttendeeDTO from './models/attendee.dto';
import { AttendeeService } from './attendee.service';
import AttendeeLoginDTO from './models/attendee-login.dto';

@Controller('/v1/attendee')
export class AttendeeController {

    @Inject()
    private service: AttendeeService;

    @Post()
    async create(@Body() attendeeDTO: AttendeeDTO, @Res() res): Promise<Response> {
        const attendee: AttendeeDTO = await this.service.create(attendeeDTO);
        return res.status(HttpStatus.CREATED).json(attendee);
    }

    @Get(':attendeeID')
    async read(@Param('attendeeID') attendeeID: number, @Res() res): Promise<Response> {
        const attendee: AttendeeDTO = await this.service.read(attendeeID);
        return res.status(HttpStatus.OK).json(attendee);
    }

    @Post('login')
    async login(@Body() attendeeLoginDTO: AttendeeLoginDTO, @Res() res): Promise<Response> {
        const attendee: AttendeeDTO = await this.service.login(attendeeLoginDTO);
        return res.status(HttpStatus.OK).json(attendee);
    }
}
