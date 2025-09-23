import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_type",
  synchronize: false,
})
export class CdAiTypeModel {
  @PrimaryGeneratedColumn({
    name: "cd_ai_type_id",
  })
  cdAiTypeId!: number;

  @Column({
    name: "cd_ai_type_guid",
    default: "uuid",
  })
  cdAiTypeGuid!: string;

  @Column({
    name: "cd_ai_type_name",
  })
  cdAiTypeName!: string;

  @Column({
    name: "cd_ai_type_description_type",
  })
  cdAiTypeDescriptionType!: string;

  @PrimaryGeneratedColumn({
    name: "cd_ai_type_id",
  })
  cdAiTypeId!: number;

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
