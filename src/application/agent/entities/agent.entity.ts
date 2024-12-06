import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import AgentDTO from '../models/agent.dto';

@Table({
    tableName: 'agents'
})
export class AgentEntity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number
    @Column
    name: string;
    @Column({
        unique: true
    })
    email: string;
    @Column({
        defaultValue: 'password123'
    })
    password: string;

    static toEntity(dto: AgentDTO): AgentEntity {
        const entity: AgentEntity = new AgentEntity();
        entity.name = dto.name;
        entity.email = dto.email;
        return entity;
    }

    static toDTO(entity: AgentEntity): AgentDTO {
        let dto: AgentDTO = new AgentDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.email = entity.email;
        dto.password = entity.password;
        return dto;
    }
}