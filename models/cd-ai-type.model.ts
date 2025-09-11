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
    nullable: true,
  })
  cdAiTypeTypeName?: string;

  @Column({
    name: "cd_ai_type_description_type",
  })
  cdAiTypeDescriptionType!: string;

  @Column({
    name: "cd_ai_type_type_type_id",
    nullable: true,
  })
  cdAiTypeTypeTypeId?: string;

  @Column({
    name: "doc_type_id",
    nullable: true,
  })
  DocTypeId?: number;

  @Column({
    name: "cd_ai_type_enabled_type",
    nullable: true,
    default: true,
  })
  cdAiTypeEnabledType?: boolean;
}
