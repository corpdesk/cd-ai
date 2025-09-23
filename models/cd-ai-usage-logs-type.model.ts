import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @PrimaryGeneratedColumn({
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
  })
  cdAiUsageLogsTypeName!: string;

  @Column({
    name: "cd_ai_usage_logs_type_description_type",
  })
  cdAiUsageLogsTypeDescriptionType!: string;

  @PrimaryGeneratedColumn({
    name: "cd_ai_usage_logs_type_id",
  })
  cdAiUsageLogsTypeId!: number;

  @Column({
    name: "doc_type_id",
  })
  docTypeId!: number;

  @Column({
    name: "cd_ai_usage_logs_type_enabled_type",
    default: true,
  })
  cdAiUsageLogsTypeEnabledType!: boolean;
}
