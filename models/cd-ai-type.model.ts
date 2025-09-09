import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_type",
  synchronize: false,
})
export class CdAiTypeModel {
  @Column({
    name: "cd_ai_type_type_id",
  })
  CdAiTypeTypeId!: number;

  @Column({
    name: "cd_ai_type_type_guid",
    default: "uuid",
  })
  CdAiTypeTypeGuid!: string;

  @Column({
    name: "cd_ai_type_type_name",
    nullable: true,
  })
  CdAiTypeTypeName?: string;

  @Column({
    name: "cd_ai_type_description_type",
  })
  CdAiTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_type_doc_type_id",
    nullable: true,
  })
  CdAiTypeDocTypeId?: number;

  @Column({
    name: "cd_ai_type_enabled_type",
    nullable: true,
    default: true,
  })
  CdAiTypeEnabledType?: boolean;
}
