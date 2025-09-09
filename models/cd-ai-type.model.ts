import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_type",
  synchronize: false,
})
export class CdAiTypeModel {
  @Column({
    name: "cd_ai_id_type_type",
  })
  cdAiIdTypeType!: number;

  @Column({
    name: "cd_ai_guid_type_type",
    default: "uuid",
  })
  cdAiGuidTypeType!: string;

  @Column({
    name: "cd_ai_name_type_type",
    nullable: true,
  })
  cdAiNameTypeType?: string;

  @Column({
    name: "cd_ai_description_type_type",
  })
  cdAiDescriptionTypeType!: string;

  @Column({
    name: "cd_ai_doc_id_type_type",
    nullable: true,
  })
  cdAiDocIdTypeType?: number;

  @Column({
    name: "cd_ai_enabled_type_type",
    nullable: true,
    default: true,
  })
  cdAiEnabledTypeType?: boolean;
}
