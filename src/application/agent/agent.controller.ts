import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import { AgentService } from './agent.service';
import AgentDTO from './models/agent.dto';
import AgentLoginDTO from './models/agent-login.dto';

@Controller('/v1/agent')
export class AgentController {

    @Inject()
    private service: AgentService;

    @Post()
    async create(@Body() agentDTO: AgentDTO, @Res() res): Promise<Response> {
        const agentCreated: AgentDTO = await this.service.create(agentDTO);
        return res.status(HttpStatus.CREATED).json(agentCreated);
    }

    @Get(':id')
    async read(@Param('id') id: number, @Res() res): Promise<Response> {
        const attendee: AgentDTO = await this.service.read(id);
        return res.status(HttpStatus.OK).json(attendee);
    }

    @Get('')
    async readAll(@Res() res): Promise<Response> {
        const attendee: AgentDTO[] = await this.service.readAll();
        return res.status(HttpStatus.OK).json(attendee);
    }

    @Post('/login')
    async login(@Body() agentLoginDTO: AgentLoginDTO, @Res() res): Promise<Response> {
        const dto: AgentDTO = await this.service.login(agentLoginDTO);
        return res.status(HttpStatus.OK).json(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res): Promise<Response> {
        const number: number = await this.service.delete(id);
        return res.status(HttpStatus.OK).json(number);    
    }
}
