import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @Column({
    name: "cd_ai_usage_logs_type_type_id",
  })
  CdAiUsageLogsTypeTypeId!: number;

  @Column({
    name: "cd_ai_usage_logs_type_type_guid",
    default: "uuid",
  })
  CdAiUsageLogsTypeTypeGuid!: string;

  @Column({
    name: "cd_ai_usage_logs_type_type_name",
    nullable: true,
  })
  CdAiUsageLogsTypeTypeName?: string;

  @Column({
    name: "cd_ai_usage_logs_type_description_type",
  })
  CdAiUsageLogsTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_usage_logs_type_doc_type_id",
    nullable: true,
  })
  CdAiUsageLogsTypeDocTypeId?: number;

  @Column({
    name: "cd_ai_usage_logs_type_enabled_type",
    nullable: true,
    default: true,
  })
  CdAiUsageLogsTypeEnabledType?: boolean;
}
