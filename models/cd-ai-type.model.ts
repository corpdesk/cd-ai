import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai_type_type",
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
    name: "cd_ai_type_description",
  })
  cdAiTypeDescription!: string;

  @Column({ name: "doc_id" })
  docId!: number;

  @Column({
    name: "cd_ai_type_enabled",
    default: true,
  })
  cdAiTypeEnabled!: boolean;
}
