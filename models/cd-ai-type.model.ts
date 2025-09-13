import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_type",
  synchronize: false,
})
export class CdAiTypeModel {
  @PrimaryGeneratedColumn({
    name: "cd_ai_type_type_id",
  })
  cdAiTypeTypeId!: number;

  @Column({
    name: "cd_ai_type_type_guid",
    default: "uuid",
  })
  cdAiTypeTypeGuid!: string;

  @Column({
    name: "cd_ai_type_type_name",
  })
  cdAiTypeTypeName!: string;

  @Column({
    name: "cd_ai_type_description_type",
  })
  cdAiTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_type_type_type_id",
  })
  cdAiTypeTypeTypeId!: number;

  @Column({
    name: "doc_type_id",
  })
  docTypeId!: number;

  @Column({
    name: "cd_ai_type_enabled_type",
    default: true,
  })
  cdAiTypeEnabledType!: boolean;
}
