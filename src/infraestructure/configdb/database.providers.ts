import { Sequelize } from "sequelize-typescript"
import { AgentEntity } from "src/application/agent/entities/agent.entity";
import { AttendeeEntity } from "src/application/attendee/entities/attendee.entity";
import { EventAttendeeConfirmedEntity } from "src/application/event/entities/event-attendee-confirmed.entity";
import { EventAttendeeEntity } from "src/application/event/entities/event-attendee.entity";
import { EventEntity } from "src/application/event/entities/event.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '@Wesley153792',
                database: 'central_eventos'
            });
            sequelize.addModels([EventEntity, AttendeeEntity, EventAttendeeEntity, EventAttendeeConfirmedEntity, AgentEntity]);
            await sequelize.sync();
            return sequelize;
        }
    }
]