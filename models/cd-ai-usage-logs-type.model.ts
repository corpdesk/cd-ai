import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_usage_logs_type_type",
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
  })
  cdAiUsageLogsTypeName!: string;

  @Column({
    name: "cd_ai_usage_logs_type_description",
  })
  cdAiUsageLogsTypeDescription!: string;

  @Column({ name: "doc_id" })
  docId!: number;

  @Column({
    name: "cd_ai_usage_logs_type_enabled",
    default: true,
  })
  cdAiUsageLogsTypeEnabled!: boolean;
}
