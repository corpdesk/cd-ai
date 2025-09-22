import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type",
  synchronize: false,
})
export class CdAiUsageLogsTypeModel {
  @PrimaryGeneratedColumn({
    name: "cd_ai_usage_logs_type_type_id",
  })
  cdAiUsageLogsTypeTypeId!: number;

  @Column({
    name: "cd_ai_usage_logs_type_type_guid",
    default: "uuid",
  })
  cdAiUsageLogsTypeTypeGuid!: string;

  @Column({
    name: "cd_ai_usage_logs_type_type_name",
  })
  cdAiUsageLogsTypeTypeName!: string;

  @Column({
    name: "cd_ai_usage_logs_type_description_type",
  })
  cdAiUsageLogsTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_usage_logs_type_type_type_id",
  })
  cdAiUsageLogsTypeTypeTypeId!: number;

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
