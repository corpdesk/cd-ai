import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @Column({
    name: "cd_ai_type_usage_logs_type_id",
  })
  cdAiTypeUsageLogsTypeId!: number;

  @Column({
    name: "cd_ai_type_usage_logs_type_guid",
    default: "uuid",
  })
  cdAiTypeUsageLogsTypeGuid!: string;

  @Column({
    name: "cd_ai_type_usage_logs_type_name",
    nullable: true,
  })
  cdAiTypeUsageLogsTypeName?: string;

  @Column({
    name: "cd_ai_type_usage_logs_description_type",
  })
  cdAiTypeUsageLogsDescriptionType!: string;

  @Column({
    name: "cd_ai_type_usage_logs_doc_type_id",
    nullable: true,
  })
  cdAiTypeUsageLogsDocTypeId?: number;

  @Column({
    name: "cd_ai_type_usage_logs_enabled_type",
    nullable: true,
    default: true,
  })
  cdAiTypeUsageLogsEnabledType?: boolean;
}
