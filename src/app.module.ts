import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendeeController } from './application/attendee/attendee.controller';
import { AttendeeService } from './application/attendee/attendee.service';
import { EventService } from './application/event/event.service';
import { EventController } from './application/event/event.controller';
import { DatabaseModule } from './infraestructure/configdb/databasemodule';
import { AgentController } from './application/agent/agent.controller';
import { AgentService } from './application/agent/agent.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, EventController, AttendeeController, AgentController],
  providers: [AppService, EventService, AttendeeService, AgentService],
})
export class AppModule {}
