import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs",
  synchronize: false,
})
export class CdAiUsageLogsModel {
  @PrimaryGeneratedColumn({
    name: "cd_ai_usage_logs_id",
  })
  cdAiUsageLogsId!: number;

  @Column({
    name: "cd_ai_usage_logs_guid",
    default: "uuid",
  })
  cdAiUsageLogsGuid!: string;

  @Column({
    name: "cd_ai_usage_logs_name",
    nullable: true,
  })
  cdAiUsageLogsName?: string;

  @Column({
    name: "cd_ai_usage_logs_description",
  })
  cdAiUsageLogsDescription!: string;

  @Column({
    name: "cd_ai_usage_logs_type_id",
    nullable: true,
  })
  cdAiUsageLogsTypeId?: string;

  @Column({
    name: "doc_id",
    nullable: true,
  })
  DocId?: number;

  @Column({
    name: "cd_ai_usage_logs_enabled",
    nullable: true,
    default: true,
  })
  cdAiUsageLogsEnabled?: boolean;
}
