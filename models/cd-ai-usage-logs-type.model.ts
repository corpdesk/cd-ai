import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @Column({
    name: "cd_ai_usage_logs_type_id",
  })
  cdAiUsageLogsTypeId!: number;

  @Column({
    name: "cd_ai_usage_logs_type_guid",
    default: "uuid",
  })
  cdAiUsageLogsTypeGuid!: string;

  @Column({
    name: "cd_ai_usage_logs_type_name",
    nullable: true,
  })
  cdAiUsageLogsTypeName?: string;

  @Column({
    name: "cd_ai_usage_logs_description_type",
  })
  cdAiUsageLogsDescriptionType!: string;

  @Column({
    name: "cd_ai_usage_logs_doc_type_id",
    nullable: true,
  })
  cdAiUsageLogsDocTypeId?: number;

  @Column({
    name: "cd_ai_usage_logs_enabled_type",
    nullable: true,
    default: true,
  })
  cdAiUsageLogsEnabledType?: boolean;
}
