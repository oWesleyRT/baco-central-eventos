import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import AgentDTO from './models/agent.dto';
import { AgentEntity } from './entities/agent.entity';
import AgentLoginDTO from './models/agent-login.dto';

@Injectable()
export class AgentService {

    async create(dto: AgentDTO): Promise<AgentDTO>{
        const agentEntity: AgentEntity = AgentEntity.toEntity(dto);
        const existAgent = await AgentEntity.findOne({
            where: {
                email: dto.email
            }
        });
        if(existAgent){
            throw new ConflictException('E-mail already exist');
        }
        await agentEntity.save();
        dto.id = agentEntity.id;
        return dto;
    }

    async read(id: number): Promise<AgentDTO> {
        const entity: AgentEntity = await AgentEntity.findByPk(id);
        if (!entity) {
            throw new NotFoundException(`Agent with ID ${id} not found`);
        }
        return AgentEntity.toDTO(entity);
    }

    async readAll(): Promise<AgentDTO[]> {
        const entity: AgentEntity[] = await AgentEntity.findAll();
        if (!entity) {
            throw new NotFoundException('Agents not found')
        }
        return entity.map(agent => AgentEntity.toDTO(agent));
    }

    async login(dto: AgentLoginDTO): Promise<AgentDTO> {
        const entity: AgentEntity = await AgentEntity.findOne({
            where: {
                email: dto.email,
                password: dto.password
            }
        });
        if(!entity) {
            throw new UnauthorizedException('Invalid e-mail or password')
        }
        return AgentEntity.toDTO(entity);
    }

    async delete(id: number): Promise<number> {
        const entity: AgentEntity = await AgentEntity.findByPk(id);
        if(!entity) {
            throw new NotFoundException(`Agent with ID ${id} not found`)
        };
        await entity.destroy();
        return id;
    }
}
