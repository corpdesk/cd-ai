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
    nullable: true,
  })
  cdAiUsageLogsTypeTypeName?: string;

  @Column({
    name: "cd_ai_usage_logs_type_description_type",
  })
  cdAiUsageLogsTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_usage_logs_type_type_type_id",
    nullable: true,
  })
  cdAiUsageLogsTypeTypeTypeId?: string;

  @Column({
    name: "doc_type_id",
    nullable: true,
  })
  DocTypeId?: number;

  @Column({
    name: "cd_ai_usage_logs_type_enabled_type",
    nullable: true,
    default: true,
  })
  cdAiUsageLogsTypeEnabledType?: boolean;
}
