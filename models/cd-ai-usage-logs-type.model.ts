import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @Column({
    name: "cd_ai_usage_logs_id_type_type",
  })
  cdAiUsageLogsIdTypeType!: number;

  @Column({
    name: "cd_ai_usage_logs_guid_type_type",
    default: "uuid",
  })
  cdAiUsageLogsGuidTypeType!: string;

  @Column({
    name: "cd_ai_usage_logs_name_type_type",
    nullable: true,
  })
  cdAiUsageLogsNameTypeType?: string;

  @Column({
    name: "cd_ai_usage_logs_description_type_type",
  })
  cdAiUsageLogsDescriptionTypeType!: string;

  @Column({
    name: "cd_ai_usage_logs_doc_id_type_type",
    nullable: true,
  })
  cdAiUsageLogsDocIdTypeType?: number;

  @Column({
    name: "cd_ai_usage_logs_enabled_type_type",
    nullable: true,
    default: true,
  })
  cdAiUsageLogsEnabledTypeType?: boolean;
}
